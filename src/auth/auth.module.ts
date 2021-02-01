import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module , ArgumentsHost} from '@nestjs/common';
import { UserModule } from '../modules/profile/user/user.module';
import { LocalStrategy } from './local.stategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { User } from '@entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';




@Module({
  imports: [
    UserModule,
    User,
    TypeOrmModule.forFeature([ User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3200000000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
