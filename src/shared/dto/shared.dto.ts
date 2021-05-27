import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class headerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    sid: number;
}