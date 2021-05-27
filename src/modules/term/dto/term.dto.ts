import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { type } from "os";

export class paginationDto {
    @ApiPropertyOptional()
    @IsOptional()
    current: string;

    @ApiPropertyOptional()
    @IsOptional()
    pageSize: string;
}
export class createCategoryDto {
    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description: string;

    @ApiPropertyOptional({ enum: ['published', 'unpublished'] })
    @IsNotEmpty()
    @IsString()
    status: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    featured: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    icon: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    image: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    banner: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    order: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    metaData: object;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    parentTermValues: [];
}


export class categoryListDto extends paginationDto { }

export class createBrandDto extends OmitType(createCategoryDto, ['parentTermValues', 'featured'] as const) { }

export class brandListDto extends paginationDto { }
export class createAttributeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ enum: ["text", "single-choice", "multiple-choice"] })
    @IsNotEmpty()
    @IsString()
    type: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    frontendVisibility: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    required: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    toolTipText: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    attrOptions: [string];

}

export class attributeListDto extends paginationDto { }

class updateAttrOptionType {
    @ApiPropertyOptional()
    id: number
    @ApiPropertyOptional()
    title: string
}
export class updateAttributeDto extends PickType(createAttributeDto, ['description', 'frontendVisibility', 'toolTipText'] as const) {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    title: string;

    @ApiPropertyOptional({ enum: ["text", "single-choice", "multiple-choice"] })
    @IsOptional()
    @IsString()
    type: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    required: boolean;

    @ApiPropertyOptional({ type: "array", items: { type: "object" } })
    @IsOptional()
    @IsArray()
    attrOptions: [];
}

