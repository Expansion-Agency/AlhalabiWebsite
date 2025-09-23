import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Profile } from 'passport-google-oauth20';
import { BadRequestException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: '1094475133342-11ad2hi18n1f8d3usce8l2ia1kveh2ea.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: "https://api.alhalapi.com/auth/google/redirect",
      scope: ['email', 'profile'],
    });
  }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: VerifyCallback,
//   ): Promise<any> {
//     const user = await this.authService.validateOAuthLogin(profile);
//     done(null, user);
//   }
// }

async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function,
  ) {
    try {
      const email = profile.emails?.[0]?.value;

      if (!email) {
        console.error('❌ No email returned from Google profile');
        return done(new BadRequestException('Email is required'), false);
      }

      const user = await this.authService.handleGoogleLogin({
        email,
        name: profile.displayName,
        provider: profile.provider,
      });
      console.log('handleGoogleLogin returned:', user);

      if (!user) {
        console.error('❌ AuthService did not return a user');
        return done(new UnauthorizedException('Login failed'), false);
      }

      console.log('✅ Google login success:', user);
      done(null, user);
    } catch (error) {
      console.error('❌ Error in GoogleStrategy.validate():', error);
      return done(error, false);
    }
  }
}
