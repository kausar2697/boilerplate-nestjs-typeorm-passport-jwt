import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';

@Module({
  imports: [RedisCacheModule],
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService]
})
export class CommonModule {}
