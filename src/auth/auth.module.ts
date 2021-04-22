import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { UserModule } from '../modules/profile/user/user.module';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { User } from '@entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    UserModule,
    User,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: "edac5915-8dc3-476a-95b4-d2cc9f632137",
      signOptions: { expiresIn: '7200s' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
//secret: process.env.JWT_SECRET,