import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CommonModule } from 'src/modules/common/common.module';
import { Product } from 'src/modules/products/productSchema/products.entity';

import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';

import { Seller } from 'src/modules/sellers/entities/seller.entity';

import { UserModule } from 'src/modules/user/users.module';
import { User } from 'src/modules/user/entities/user.entity';
import { LoggerMiddleware } from './logger.middleware';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './orderSchema/order.entity';



@Module({
    imports: [UserModule,TypeOrmModule.forFeature([Order,Seller,User,Product], 'quykshop'),CommonModule,RedisCacheModule],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [TypeOrmModule.forFeature([])],
    
})
export class OrderModule {
}
