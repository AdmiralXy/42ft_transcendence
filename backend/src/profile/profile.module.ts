import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [ProfileController],
  imports: [UserModule],
})
export class ProfileModule {}
