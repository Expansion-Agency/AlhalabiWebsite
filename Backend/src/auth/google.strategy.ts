import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: '1094475133342-d25473aatig1mgqn20fqhgrpvfkv8r57.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/redirect',
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
