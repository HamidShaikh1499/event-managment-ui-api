import { Type } from 'class-transformer';
import {
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsArray()
    images?: Express.Multer.File[];

    @IsDateString()
    @IsNotEmpty()
    startDate: Date;

    @IsDateString()
    @IsNotEmpty()
    endDate: Date;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    totalGuests?: number;

    @IsOptional()
    @IsString()
    category?: string;
}
