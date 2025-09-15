import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Headers,
  UsePipes,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { loginDto, loginSchema } from './dto/login.dto';
import { Role } from 'src/shared/enums/role.enum';
import { signUpDto, signUpSchema } from './dto/signup.dto';
import { Throttle } from '@nestjs/throttler';
import { ResetPasswordDTO } from './dto/resetPassword.dto';
import { verifyTokenDto } from './dto/verifyToken.dto';
import { JoiValidationPipe } from 'src/shared/utils/joiValidations';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  // START GOOGLE LOGIN FLOW
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // Redirects to Google OAuth2 login page
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const googleUser = req.user as any;

    // Safely get email
    const email = googleUser?.email || googleUser?.emails?.[0]?.value;

    // Safely get name
    const nameObj = googleUser?.name || {};
    const displayName =
      typeof nameObj === 'string'
        ? nameObj
        : nameObj?.formatted ||
          nameObj?.fullName ||
          `${nameObj?.givenName || ''} ${nameObj?.familyName || ''}`.trim();

    // 1. Check if user exists in DB
    let user = await this.usersService.findByEmail(email);
    if (!user) {
      // 2. If not exists, create user
      user = await this.usersService.createUserFromGoogle({
        email,
        name: displayName,
        provider: 'google',
        // add other fields as needed
      });
    }

     const token = await this.authService.generateJwt(user);

    return res.redirect(`https://alhalabi.com/auth/google/callback?token=${token}`);
  }

  @ApiBody({ type: loginDto })
  @ApiOperation({ summary: 'User login' })
  @ApiHeader({
    name: 'userType',
    description: 'Type of user logging in',
    required: false,
    schema: { enum: Object.values(Role) },
  })
  @UsePipes(new JoiValidationPipe(loginSchema))
  @Post('login')
  async login(@Body() signInDto: loginDto, @Headers('userType') userType: string) {
    const data = await this.authService.login(signInDto.email, signInDto.password, userType);
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data,
    };
  }

  @ApiOperation({ summary: 'User signUp' })
  @ApiBody({ type: signUpDto })
  @Post('signUp')
  @UsePipes(new JoiValidationPipe(signUpSchema))
  async signUp(@Body() signUpDto: signUpDto, @Headers('userType') userType: Role) {
    const data = await this.authService.signUp(signUpDto, userType);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Send Otp by Email' })
  @Throttle({ default: { limit: 2, ttl: 30 } })
  @Post('sendotp')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        input: { type: 'string' },
      },
    },
  })
  async sendOtp(@Body() sendOtpDto: Record<string, any>, @Headers('userType') userType: string) {
    await this.authService.sendVerficationOtp(sendOtpDto.input, userType);
    return {
      statusCode: HttpStatus.OK,
      message: 'OTP sent successfully',
    };
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        otp: { type: 'string' },
        input: { type: 'string' },
      },
    },
  })
  @Post('verifyotp')
  @ApiOperation({ summary: 'Verify the otp' })
  async verifyOtp(@Body() data: verifyTokenDto, @Headers('userType') userType: string = 'USER') {
    await this.authService.verifyOtp(data.input, data.otp, userType);
    return {
      statusCode: HttpStatus.OK,
      message: 'OTP verified successfully',
    };
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        input: { type: 'string' },
      },
    },
  })
  @Post('forget')
  @ApiOperation({ summary: 'Send otp for forgot password' })
  async forgetPassword(@Body() data: Record<string, any>, @Headers('userType') userType: string = 'USER') {
    await this.authService.forgetPassword(data.input, userType);
    return {
      statusCode: HttpStatus.OK,
      message: 'Reset password link sent successfully',
    };
  }

  @Post('reset')
  @ApiBody({ type: ResetPasswordDTO })
  @ApiOperation({ summary: 'Reset password' })
  async resetPassword(@Body() data: ResetPasswordDTO, @Headers('userType') userType: string = 'USER') {
    await this.authService.resetPassword(data, userType);
    return {
      statusCode: HttpStatus.OK,
      message: 'Password reset successfully',
    };
  }

  @Post('otp-valid')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        input: { type: 'string' },
        otp: { type: 'string' },
      },
    },
  })
  async otpValid(@Body() data: Record<string, any>, @Headers('userType') userType: string = 'USER') {
    const { isValid } = await this.authService.isOtpValid(data.input, userType, data.otp);
    return {
      statusCode: HttpStatus.OK,
      message: 'OTP verified successfully',
      data: {
        isValid,
      },
    };
  }
}
