import {
    IsOptional,
    IsString,
    IsNumber,
    Min,
    IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class EventFilterDto {
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    offset: number;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit: number;

    @IsOptional()
    @IsString()
    sorting?: string;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsString()
    category?: string;
}
