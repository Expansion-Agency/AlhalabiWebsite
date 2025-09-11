import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: '1094475133342-11ad2hi18n1f8d3usce8l2ia1kveh2ea.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: "http://localhost:3005/auth/google/redirect",
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = await this.authService.validateOAuthLogin(profile);
    done(null, user);
  }
}
