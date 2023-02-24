import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
