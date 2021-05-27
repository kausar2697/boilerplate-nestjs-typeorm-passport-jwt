import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TermModule } from './modules/term/term.module';
import { TypeOrmModule} from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
import { UserModule } from './modules/user/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SellersModule } from './modules/sellers/sellers.module';
import { MediaModule } from './modules/media/media.module';
import { Product } from './modules/products/productSchema/products.entity';
import { Seller } from './modules/sellers/entities/seller.entity';
import { User } from './modules/user/entities/user.entity';
import { TermValue } from './modules/term/entities/termValue.entity';
import { Term } from './modules/term/entities/term.entity';
import { OrderModule } from './modules/order/order.module';
import { Order } from './modules/order/orderSchema/order.entity';
import { SettingsModule } from './modules/settings/settings.module';
import { Setting } from './modules/settings/settingsSchema/setting.entity';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { PaymentModule } from './modules/payment/payment.module';
import {PayTransaction } from './modules/payment/paymentSchema/paytransaction';
import { CommonModule } from './modules/common/common.module';
import { WsNotificationModule } from './wsnotification/ws-notification.module';
import { UserRoleModule } from './modules/user-role/user-role.module';
import { UserRole } from './modules/user-role/entities/user-role.entity';
import { UserPermission } from './modules/user-permission/entities/user-permission.entity';
import { UserPermissionModule } from './modules/user-permission/user-permission.module';
import { UserVsSellerVsRole } from './modules/user/entities/user_vs_seller_vs_role.entity';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
        name:'quykshop',
        useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'everexpert',
        password: 'Ebhubon#com$123',
        database: 'quykshop',
        charset : 'utf8mb4',
        //autoLoadEntities: true,
        entities: [TermValue,User,UserRole,UserPermission,UserVsSellerVsRole,Seller,Product,Term,Order,Setting,PayTransaction],
        synchronize: true,
        useNewUrlParser: true,
        logging: false,
        //autoLoadEntities: true,
         useUnifiedTopology: true, 
      }), 
    }),
  TermModule, ProductsModule, UserModule,AuthModule, SellersModule, MediaModule,OrderModule, SettingsModule, RedisCacheModule, PaymentModule, CommonModule,WsNotificationModule, UserRoleModule, UserPermissionModule],
  controllers: [AppController ],
  providers: [],
  exports:[TypeOrmModule]
})
export class AppModule {

}

//changes