import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class checkUniqeDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    shopTitle: string;
}