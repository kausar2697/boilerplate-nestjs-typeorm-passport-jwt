import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from 'src/modules/sellers/entities/seller.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { MediaController } from './media.controller';

@Module({

    imports: [TypeOrmModule,TypeOrmModule.forFeature([Seller],'quykshop'),
        MulterModule.register({
          // dest: 'upload',
        }),
    ],
    controllers: [ MediaController],
    providers: [],
    exports: []
})
export class MediaModule {}
