import { UseGuards } from '@nestjs/common';
import { Controller, Get, Post, Body, Put, Param, Delete ,Request} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SettingsService } from './settings.service';



@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body, @Request() req) {
    return this.settingsService.createSettings(body ,req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('info')
  async findAll(@Request() req) {
    return this.settingsService.getSettings(req);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.settingsService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSettingDto) {
    return this.settingsService.update(+id, updateSettingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.settingsService.remove(+id);
  }


}
