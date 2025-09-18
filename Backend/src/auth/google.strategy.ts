import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Profile } from 'passport-google-oauth20';
import { BadRequestException } from '@nestjs/common';

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

validate(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: Function,
) {
  console.log('Google profile:', profile);

const email = profile.emails?.[0]?.value;

if (!email) {
  throw new BadRequestException('Email is required for Google login');
}

const googleUser = {
  email,  // now it's guaranteed to be a string
  name: profile.displayName,
  provider: 'google',
};

  this.authService.handleGoogleLogin(googleUser)
    .then(user => done(null, user))
    .catch(err => done(err, false));
}}
