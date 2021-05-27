import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermController } from './term.controller';
import { termService } from './term.service';
import { TermValue } from './entities/termValue.entity';
import { Term } from './entities/term.entity';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { Seller } from 'src/modules/sellers/entities/seller.entity';
import { Product } from 'src/modules/products/productSchema/products.entity';
import { CommonModule } from '../common/common.module';
@Module({

    imports: [TypeOrmModule.forFeature([Term,TermValue,Seller],'quykshop'),RedisCacheModule,CommonModule],
    controllers: [ TermController],
    providers: [ termService],
    exports: [termService,]




})
export class TermModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
    //   consumer
    //     .apply(categoryCreateMiddleware)
    //     .forRoutes({path: 'category/create',method:RequestMethod.POST},
    //     {path: 'category/createCategory',method:RequestMethod.POST});
        // consumer
        // .apply(categoryUpdateMiddleware)
        // .forRoutes({path: 'products/delete',method:RequestMethod.PUT},
        // {path: 'products/update',method:RequestMethod.PUT});
  
    //   consumer
    //   .apply(CatUpdatedMiddleware)
    //   .exclude(
    //   { path: 'cats/registration', method: RequestMethod.POST }
    //  )
    //  .forRoutes(CatsController);
    }
}
