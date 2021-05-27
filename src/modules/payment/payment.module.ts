import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayTransaction } from './paymentSchema/paytransaction';
import { Order } from 'src/modules/order/orderSchema/order.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { CommonModule } from 'src/modules/common/common.module';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([PayTransaction,Order,User], 'quykshop'),CommonModule,RedisCacheModule],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
