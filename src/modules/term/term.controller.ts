import { Body, Controller, Get, Post, Request, UseGuards, Query, Res, Param, Headers, Put } from '@nestjs/common';
import { termService } from './term.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { brandListDto, categoryListDto, createAttributeDto, createBrandDto, createCategoryDto, updateAttributeDto } from './dto/term.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { headerDto } from 'src/shared/dto/shared.dto';
@Controller('term')
export class TermController {
    constructor(private readonly termService: termService) { }

    //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ frontend ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
    //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ start ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜



    //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ End ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
    //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ frontend ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜



    //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂ Shop admin panel ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂
    //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂    start   ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂

    //🎁 creating category ==================>
    @ApiTags('Term')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create Category' })
    @UseGuards(JwtAuthGuard)
    @Post('shop/category')
    async createcategory(@Headers() headers: headerDto, @Body() body: createCategoryDto, @Request() req) {
        return await this.termService.createcategory(headers, body, req.user);
    }

    //🎁 get category list ==================>
    @ApiTags('Term')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get Category List' })
    @UseGuards(JwtAuthGuard)
    @Get('shop/category')
    async GetCategoryList(@Headers() headers: headerDto, @Query() query: categoryListDto) {
        return await this.termService.getCategoryList(headers, query);
    }

    //🎁 get category info by id ==================>
    @ApiTags('Term')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get Category Info By Id' })
    @UseGuards(JwtAuthGuard)
    @Get('shop/category/:id')
    async CategoryInfoById(@Headers() headers: headerDto, @Param('id') id: number) {
        return await this.termService.categoryInfoById(headers, +id);
    }

    //🎁 creating category ==================>
    @ApiTags('Term')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create Brand' })
    @UseGuards(JwtAuthGuard)
    @Post('shop/brand')
    async createBrand(@Headers() headers: headerDto, @Body() body: createBrandDto, @Request() req) {
        return await this.termService.createBrand(headers, body, req.user);
    }

    //🎁 get category list ==================>
    @ApiTags('Term')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get Brand List' })
    @UseGuards(JwtAuthGuard)
    @Get('shop/brand')
    async getBrandList(@Headers() headers: headerDto, @Query() query: brandListDto) {
        return await this.termService.getBrandList(headers, query);
    }

    //🎁 get category info by id ==================>
    @ApiTags('Term')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get Brand Info By Id' })
    @UseGuards(JwtAuthGuard)
    @Get('shop/brand/:id')
    async brandInfoById(@Headers() headers: headerDto, @Param('id') id: number) {
        return await this.termService.brandInfoById(headers, +id);
    }

    //🎁 creating category ==================>
    @ApiTags('Term')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create Attribute' })
    @UseGuards(JwtAuthGuard)
    @Post('shop/attribute')
    async createAttribute(@Headers() headers: headerDto, @Body() body: createAttributeDto, @Request() req) {
        return await this.termService.createAttribute(headers, body, req.user);
    }

    //🎁 get attribute list ==================>
    @ApiTags('Term')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get Attribute List' })
    @UseGuards(JwtAuthGuard)
    @Get('shop/attribute')
    async getAttributeList(@Headers() headers: headerDto, @Query() query: brandListDto) {
        return await this.termService.getAttributeList(headers, query);
    }

    //🎁 get Attribute info by id ==================>
    @ApiTags('Term')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get Term Info By Id' })
    @UseGuards(JwtAuthGuard)
    @Get('shop/attribute/:id')
    async attributeInfoById(@Headers() headers: headerDto, @Param('id') id: number) {
        return await this.termService.attributeInfoById(headers, +id);
    }

    //🎁 update Attribute info by id ==================>
    @ApiTags('Term')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Term Info By Id' })
    @UseGuards(JwtAuthGuard)
    @Put('shop/attribute/:id')
    async updateAttributeInfo(@Headers() headers: headerDto, @Param('id') id: number ,@Body() body:updateAttributeDto,@Request() req) {
        return await this.termService.updateAttributeInfo(headers,+id,body,req.user);
    }

    //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂    End   ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂
    //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂ Shop admin panel ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂



    //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ Master admin panel ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
    //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜   start   ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜



    //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜    End   ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
    //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ Master admin panel ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜



    //※※※※※※※※※※※※※ Helper functions START ※※※※※※※※※※※※※※


    //※※※※※※※※※※※※※ Helper functions END ※※※※※※※※※※※※※※
}
