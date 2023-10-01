import { IsString, IsOptional } from 'class-validator';

export class OrderDTO {
  @IsOptional()
  @IsString()
  side?: string;

  @IsOptional()
  @IsString()
  price?: string;
}
