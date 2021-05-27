import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from './entities/user.entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UserRole } from 'src/modules/user-role/entities/user-role.entity';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { UserVsSellerVsRole } from './entities/user_vs_seller_vs_role.entity';

@Module({

  imports: [forwardRef(() => AuthModule),TypeOrmModule.forFeature([User,UserRole,UserVsSellerVsRole],'quykshop'),RedisCacheModule],
  controllers: [ UserController],
  providers: [ UserService],
  exports: [UserService]
  
})
export class UserModule {}
