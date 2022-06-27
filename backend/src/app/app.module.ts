import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { MulterModule } from '@nestjs/platform-express';
import { UploadsModule } from '../uploads/uploads.module';
import { FriendsModule } from '../friends/friends.module';
import { BlacklistModule } from '../blacklist/blacklist.module';
import { RelationsModule } from '../relations/relations.module';
import { DirectModule } from '../direct/direct.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    UploadsModule,
    FriendsModule,
    BlacklistModule,
    RelationsModule,
    DirectModule,
    GroupsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
