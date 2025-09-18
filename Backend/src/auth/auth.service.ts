import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import prisma from '../shared/prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/shared/enums/role.enum';
import { UsersService } from 'src/users/users.service';
import { AdminsService } from 'src/admins/admins.service';
import { Payload } from 'src/types';
import { Users, Admins } from '@prisma/client';
import Verification from 'src/shared/utils/verfication/Verification';
import { ResetPasswordDTO } from './dto/resetPassword.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private adminService: AdminsService,
    private verificationProvider: Verification,
  ) {}

  async validateOAuthLogin(profile: any): Promise<any> {
    const user = {
      email: profile.emails[0].value,
      name: profile.displayName,
      provider: profile.provider,
    };
    return user;
  }
  createToken(user: any): string {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
  async login(email: string, password: string, userType: string) {
    let user: Users | Admins | null = null;
    if (userType === Role.User.toString()) {
      user = await prisma.users.findUnique({ where: { email } });
    } else if (userType === Role.Admin.toString()) {
      user = await prisma.admins.findUnique({ where: { email } });
    }

    if (!user) throw new NotFoundException('Invalid email or password');

    const isMatch = await bcrypt.compare(password, (user as any).password);
    if (!isMatch) throw new NotFoundException('Invalid email or password');

    if ((user as any).deletedAt) throw new NotFoundException('User is deleted');

    const payload: Payload = { sub: user.id, role: userType };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async signUp(user: CreateUserDto, userType: string) {
    if (userType === Role.User.toString()) {
      if (!(await this.userService.isVerified(user.email))) {
        throw new BadRequestException('Email is not verified');
      }

      // Check if user already exists to prevent duplicates
      const existingUser = await this.userService.findByEmail(user.email);
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }

      // Hash the password before saving
      // const hashedPassword = await bcrypt.hash(user.password, 10);

      const createdUser = await this.userService.create({
        ...user,
        password: user.password, // replace plain password with hashed one
      });

      return createdUser;
    }

    throw new BadRequestException('Invalid user type for sign up');
  }
  async sendVerficationOtp(input: string, userType: string) {
    if (!input || !userType) {
      throw new BadRequestException('Email/Phone and userType are required');
    }

    try {
      await this.verificationProvider.sendVerificationCode(input, userType);
      return { message: 'OTP sent successfully' };
    } catch (error) {
      console.error('OTP send error:', error);
      throw new InternalServerErrorException('Failed to send OTP');
    }
  }

  async isOtpValid(input: string, userType: string, otp: string) {
    const isValid = await this.verificationProvider.verify(input, otp, userType);
    if (!isValid) throw new BadRequestException('Invalid OTP');
    return { isValid };
  }

  async verifyOtp(input: string, otp: string, userType: string) {
    const isValid = await this.verificationProvider.verify(input, otp, userType);
    if (!isValid) throw new BadRequestException('Invalid OTP');
    return { message: 'OTP verified successfully' };
  }

  public async forgetPassword(email: string, userType: string) {
    if (userType == 'USER') {
      await this.userService.findOne(email);
    }
    await this.verificationProvider.sendVerificationCodeForget(email, userType);
  }

  public async resetPassword(data: ResetPasswordDTO, userType: string) {
    if (userType == 'USER') {
      const user = await this.userService.findOne(data.email);
      if (!user) throw new NotFoundException('User not found');

      const isSamePassword = await bcrypt.compare(data.newPassword, user.password);
      if (isSamePassword) {
        throw new BadRequestException('New password cannot be same as old password');
      }

      await this.verifyOtp(data.email, data.otp, userType);

      const hashedPassword = await bcrypt.hash(data.newPassword, 10);
      await this.userService.updateUserPassword(user.id, hashedPassword);
    }
  }

  async handleGoogleLogin(googleUser: { email: string; name: string; provider: string }) {
    let user = await this.userService.findByEmail(googleUser.email);

    if (!user) {
      user = await this.userService.createUserFromGoogle({
        email: googleUser.email,
        name: googleUser.name,
        provider: googleUser.provider,
      });
    }

    const payload: Payload = { sub: user.id, role: Role.User };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, user };
  }

  async generateJwt(user: Users): Promise<string> {
    if (!user) {
      throw new NotFoundException('User not found for generating token');
    }

    const payload: Payload = { sub: user.id, role: Role.User };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
