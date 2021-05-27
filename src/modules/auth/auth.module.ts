import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';


import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { SellersModule } from 'src/modules/sellers/sellers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Seller } from 'src/modules/sellers/entities/seller.entity';

import { CommonModule } from 'src/modules/common/common.module';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { UserRole } from 'src/modules/user-role/entities/user-role.entity';
import { RolesGuard } from '../../guards/roles.guard';
import { UserModule } from 'src/modules/user/users.module';
import { User } from 'src/modules/user/entities/user.entity';
import { UserVsSellerVsRole } from 'src/modules/user/entities/user_vs_seller_vs_role.entity';


@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => SellersModule,),
    TypeOrmModule.forFeature([Seller,UserRole,User,UserVsSellerVsRole],'quykshop'),
    PassportModule,
    CommonModule,RedisCacheModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '172800s'},

    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy,RolesGuard],
  exports: [AuthService,PassportModule],
})
export class AuthModule {}