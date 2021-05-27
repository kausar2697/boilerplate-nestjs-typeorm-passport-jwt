import { Module } from '@nestjs/common';
import { UserPermissionService } from './user-permission.service';
import { UserPermissionController } from './user-permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermission } from './entities/user-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPermission],'quykshop')],
  controllers: [UserPermissionController],
  providers: [UserPermissionService]
})
export class UserPermissionModule {}
