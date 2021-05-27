import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CommonService } from './common.service';


@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}
  
  @Post()
  create(@Body() createCommonDto) {
    return this.commonService.create(createCommonDto);
  }

  @Get()
  findAll() {
    return this.commonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commonService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommonDto) {
    return this.commonService.update(+id, updateCommonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commonService.remove(+id);
  }
}
