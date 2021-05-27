import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { User } from 'src/modules/user/entities/user.entity';
import { Seller } from './entities/seller.entity';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';
import { Product } from 'src/modules/products/productSchema/products.entity';
import { CommonModule } from 'src/modules/common/common.module';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { UserRole } from 'src/modules/user-role/entities/user-role.entity';

@Module({
  imports: [forwardRef(() => AuthModule),TypeOrmModule,CommonModule,RedisCacheModule, TypeOrmModule.forFeature([Seller,Product],'quykshop'),TypeOrmModule.forFeature([User,UserRole],'quykshop')],
  controllers: [ SellersController],
  providers: [ SellersService,],
  exports: [SellersService]
})

export class SellersModule{
}
