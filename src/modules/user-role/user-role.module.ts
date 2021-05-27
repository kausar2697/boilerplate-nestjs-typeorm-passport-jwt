import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { UserPermission } from '../user-permission/entities/user-permission.entity';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole,UserPermission],'quykshop'),RedisCacheModule],
  controllers: [UserRoleController],
  providers: [UserRoleService]
})
export class UserRoleModule {}
