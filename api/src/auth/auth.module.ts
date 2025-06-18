/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import constants from 'src/helper/constants';
import { JwtStrategy } from 'src/helper/stretagy/jwt.strategy';
import { UserDetail, UserDetailSchema } from 'src/models/userModel';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(constants.configKey.jwt.secret),
        signOptions: {
          expiresIn: configService.get(constants.configKey.jwt.jwtExpireTime),
        },
      }),
    }),
    MongooseModule.forFeature([
      { name: UserDetail.name, schema: UserDetailSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
