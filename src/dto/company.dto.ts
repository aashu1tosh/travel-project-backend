import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CompanyAddDTO {
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    slogan: string;

    @IsNotEmpty()
    @IsUUID()
    media: string;
}

export class CompanyUpdateDTO {
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
