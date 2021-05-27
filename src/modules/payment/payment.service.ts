import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/modules/common/common.service';
import { Order } from 'src/modules/order/orderSchema/order.entity';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { PayTransaction } from './paymentSchema/paytransaction';
import axios from 'axios'
import { query } from 'express';

@Injectable()
export class PaymentService {

  constructor(
  ) { }

}
