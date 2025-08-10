// import { Injectable } from '@nestjs/common';
// import NodeMailerRepository from '../email/NodeMailerRepository';
// import VerificationCodeGenerator from '../code-generator/VerificationCodeGenerator';
// import { MailService } from 'src/mail/mail.service';
// import { joiValidator } from '../joi/joiValidator';
// import prisma from 'src/shared/prisma/client';
// import moment from 'moment';
// import Joi from 'joi';

// @Injectable()
// export default class Verification {
//   private readonly emailProvider: NodeMailerRepository;
//   private readonly verificationCodeGenerator: VerificationCodeGenerator;

//   constructor(private mailService: MailService) {
//     this.emailProvider = new NodeMailerRepository(this.mailService);
//     this.verificationCodeGenerator = new VerificationCodeGenerator();
//   }

//   async verify(
//     emailOrPhone: string,
//     code: string,
//     userType: string,
//   ): Promise<boolean> {
//     return this.isOtpValidForEmail(emailOrPhone, code, userType);
//   }

//   async sendVerificationCode(email: string, userType: string): Promise<void> {
//     await this.sendEmailVerificationCode(email, userType);
//   }

//   private async generateCode(): Promise<{ code: string; hashedCode: string }> {
//     const code = this.verificationCodeGenerator.generateCode();
//     const hashedCode = this.verificationCodeGenerator.hash(code);
//     return Promise.resolve({ code, hashedCode });
//   }

//   private async setOtpUserCode(
//     input: string,
//     userType: string,
//     hashedCode: string,
//   ) {
//     const userCode = await prisma.otpCodes.findFirst({
//       where: {
//         input: input,
//       },
//     });

//     if (userCode) {
//       await prisma.otpCodes.update({
//         where: {
//           id: userCode.id,
//         },
//         data: {
//           hashedCode,
//           expiresAt: moment().add(3, 'minutes').toDate(),
//           isVerified: false,
//           userType,
//         },
//       });
//     } else {
//       await prisma.otpCodes.create({
//         data: {
//           input,
//           hashedCode,
//           expiresAt: moment().add(3, 'minutes').toDate(),
//           userType,
//         },
//       });
//     }
//   }

//   public async sendEmailVerificationCode(email: string, userType: string) {
//     joiValidator(
//       { email: email },
//       Joi.object({ email: Joi.string().email().required() }),
//     );
//     const { code, hashedCode } = await this.generateCode();
//     await this.setOtpUserCode(email, 'USER', hashedCode);
//     await this.emailProvider.sendVerify(email, code);
//     await this.setOtpUserCode(email, userType, hashedCode);
//   }

//   public async sendVerificationCodeForget(email: string, userType: string) {
//     joiValidator(
//       { email: email },
//       Joi.object({ email: Joi.string().email().required() }),
//     );
//     const { code, hashedCode } = await this.generateCode();
//     await this.setOtpUserCode(email, 'USER', hashedCode);
//     await this.emailProvider.sendForgetPasswordEmail(email, code);
//     await this.setOtpUserCode(email, userType, hashedCode);
//   }

//   private async isOtpValid(
//     input: string,
//     code: string,
//     userType: string,
//   ): Promise<boolean> {
//     const userCode = await prisma.otpCodes.findFirst({
//       where: {
//         input: input,
//         userType: userType,
//       },
//     });

//     if (userCode) {
//       if (
//         this.verificationCodeGenerator.verifyCode(
//           code,
//           userCode.hashedCode || '',
//         )
//       ) {
//         if (moment().toDate() < moment(userCode.expiresAt).toDate()) {
//           await prisma.otpCodes.update({
//             where: {
//               id: userCode.id,
//             },
//             data: {
//               isVerified: true,
//             },
//           });
//           return true;
//         }
//       }
//     }
//     return false;
//   }

//   private async isOtpValidForEmail(
//     input: string,
//     code: string,
//     userType: string,
//   ): Promise<boolean> {
//     return this.isOtpValid(input, code, userType);
//   }
// }
import { Injectable, BadRequestException } from '@nestjs/common';
import prisma from 'src/shared/prisma/client';
import moment from 'moment';
import Joi from 'joi';
import { joiValidator } from '../joi/joiValidator';
import VerificationCodeGenerator from '../code-generator/VerificationCodeGenerator';
import NodeMailerRepository from '../email/NodeMailerRepository';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export default class Verification {
  private readonly emailProvider: NodeMailerRepository;
  private readonly verificationCodeGenerator: VerificationCodeGenerator;

  constructor(private mailService: MailService) {
    this.emailProvider = new NodeMailerRepository(this.mailService);
    this.verificationCodeGenerator = new VerificationCodeGenerator();
  }

  async verify(emailOrPhone: string, code: string, userType: string): Promise<boolean> {
    console.log(`Verifying OTP for ${emailOrPhone}, userType=${userType}, code=${code}`);
    const valid = await this.isOtpValid(emailOrPhone, code, userType);
    console.log(`OTP verification result: ${valid}`);
    return valid;
  }

  async sendVerificationCode(email: string, userType: string): Promise<void> {
    console.log(`Sending verification OTP to ${email} for userType=${userType}`);
    await this.sendEmailVerificationCode(email, userType);
  }

  async sendVerificationCodeForget(email: string, userType: string): Promise<void> {
    console.log(`Sending forget-password OTP to ${email} for userType=${userType}`);
    await this.sendForgetPasswordVerificationCode(email, userType);
  }

  private async generateCode(): Promise<{ code: string; hashedCode: string }> {
    const code = this.verificationCodeGenerator.generateCode();
    const hashedCode = this.verificationCodeGenerator.hash(code);
    console.log('Generated OTP code:', code);
    return { code, hashedCode };
  }

  private async setOtpUserCode(input: string, userType: string, hashedCode: string) {
    console.log(`Storing OTP in DB for ${input} and userType=${userType}`);
    const userCode = await prisma.otpCodes.findFirst({
      where: { input, userType },
    });

    if (userCode) {
      console.log('Existing OTP found, updating...');
      await prisma.otpCodes.update({
        where: { id: userCode.id },
        data: {
          hashedCode,
          expiresAt: moment().add(3, 'minutes').toDate(),
          isVerified: false,
          userType,
        },
      });
    } else {
      console.log('No OTP found, creating new record...');
      await prisma.otpCodes.create({
        data: {
          input,
          hashedCode,
          expiresAt: moment().add(3, 'minutes').toDate(),
          userType,
          isVerified: false,
        },
      });
    }
  }

  private async sendEmailVerificationCode(email: string, userType: string) {
    joiValidator(
      { email },
      Joi.object({ email: Joi.string().email().required() }),
    );

    const { code, hashedCode } = await this.generateCode();
    await this.setOtpUserCode(email, userType, hashedCode);
    console.log(`Sending email OTP to ${email}: ${code}`);
    await this.emailProvider.sendVerify(email, code);
  }

  private async sendForgetPasswordVerificationCode(email: string, userType: string) {
    joiValidator(
      { email },
      Joi.object({ email: Joi.string().email().required() }),
    );

    const { code, hashedCode } = await this.generateCode();
    await this.setOtpUserCode(email, userType, hashedCode);
    console.log(`Sending forget-password OTP to ${email}: ${code}`);
    await this.emailProvider.sendForgetPasswordEmail(email, code);
  }

  private async isOtpValid(input: string, code: string, userType: string): Promise<boolean> {
    console.log(`Checking OTP validity for ${input} and userType=${userType}`);
    const record = await prisma.otpCodes.findFirst({
      where: { input, userType },
    });

    if (!record) {
      console.warn('No OTP record found');
      return false;
    }
if (!record || !record.hashedCode) {
  console.warn('OTP record missing or hashedCode is null');
  return false;
}


    const isCodeMatch = this.verificationCodeGenerator.verifyCode(code, record.hashedCode);
    if (!isCodeMatch) {
      console.warn(`OTP code mismatch: entered=${code}, expected hash=${record.hashedCode}`);
      return false;
    }

    const now = moment();
    const expiresAt = moment(record.expiresAt);
    if (now.isAfter(expiresAt)) {
      console.warn(`OTP expired: now=${now.toISOString()}, expiresAt=${expiresAt.toISOString()}`);
      return false;
    }

    console.log('OTP is valid, marking as verified');
    await prisma.otpCodes.update({
      where: { id: record.id },
      data: { isVerified: true },
    });

    return true;
  }
}
