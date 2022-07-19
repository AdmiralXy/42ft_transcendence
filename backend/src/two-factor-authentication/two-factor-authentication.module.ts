import { Module } from '@nestjs/common';
import { TwoFactorAuthenticationService } from './two-factor-authentication.service';
import { TwoFactorAuthenticationController } from './two-factor-authentication.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [TwoFactorAuthenticationController],
  providers: [TwoFactorAuthenticationService],
  exports: [TwoFactorAuthenticationService],
})
export class TwoFactorAuthenticationModule {}
