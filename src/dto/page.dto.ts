import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';
import { PAGE } from './../constant/enum';

export class PageAddDTO {
    @IsNotEmpty()
    @IsEnum(PAGE)
    page: string;

    @IsNotEmpty()
    @IsString()
    slogan: string;

    @IsNotEmpty()
    @IsUUID()
    media: string;
}

export class PageUpdateDTO {
    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    slogan: string;

    @IsOptional()
    @IsUUID()
    media: string;
}
