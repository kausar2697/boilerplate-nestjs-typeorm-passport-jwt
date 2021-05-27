import { Body, Controller, Get, Param, Post, Query, Req, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
@Controller('product')
export class ProductsController {

    constructor(private readonly productService: ProductsService) { }

}
