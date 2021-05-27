import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards,Request, Req } from '@nestjs/common'; 
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PaymentService } from './payment.service';


@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  
}
