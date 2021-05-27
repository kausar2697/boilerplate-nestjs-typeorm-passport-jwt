import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './settingsSchema/setting.entity';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([Setting], 'quykshop'),RedisCacheModule],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule {}
