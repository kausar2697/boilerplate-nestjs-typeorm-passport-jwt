import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class adminLoginDto {
    @ApiPropertyOptional()
    @IsEmail()
    @IsOptional()
    mail: string;

    @ApiPropertyOptional()
    @IsOptional()
    cellNo: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}

export class shopSignupDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    mail: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    cellNo: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    otpCode: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    password: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    shopTitle: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    sellerType: string;
}

export class shopLoginDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    mail: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    cellNo: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    password: string;
}

