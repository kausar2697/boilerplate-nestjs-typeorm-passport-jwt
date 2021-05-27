import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './productSchema/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TermValue } from 'src/modules/term/entities/termValue.entity';
import { Term } from 'src/modules/term/entities/term.entity';
import { Seller } from 'src/modules/sellers/entities/seller.entity';
import { Order } from 'src/modules/order/orderSchema/order.entity';


@Module({
    imports: [TypeOrmModule,TypeOrmModule.forFeature([Product,Seller,Order],'quykshop'),
    TypeOrmModule.forFeature([TermValue],'quykshop'),
    TypeOrmModule.forFeature([Term],'quykshop')],
    controllers: [ ProductsController],
    providers: [ ProductsService],
    exports: [ProductsService,]



})
export class ProductsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
    //   consumer
    //     .apply(productCreateMiddleware)
    //     .forRoutes({path: 'products/create',method:RequestMethod.POST});
    //     consumer
    //     .apply(productUpdateMiddleware)
    //     .forRoutes({path: 'products/delete',method:RequestMethod.PUT},
    //     {path: 'products/update',method:RequestMethod.PUT});
  
    //   consumer
    //   .apply(CatUpdatedMiddleware)
    //   .exclude(
    //   { path: 'cats/registration', method: RequestMethod.POST }
    //  )
    //  .forRoutes(CatsController);
    }
}
