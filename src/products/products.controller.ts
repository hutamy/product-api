import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserMetadata } from 'src/auth/user-metadata.interface';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  private logger = new Logger('ProductsController');
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(@GetUser() user: UserMetadata): Promise<Product[]> {
    this.logger.verbose(`Retrieve all products for user ${user.username}`);
    return await this.productsService.getProducts(user);
  }

  @Get('/:id')
  async getProductById(
    @Param('id') id: string,
    @GetUser() user: UserMetadata,
  ): Promise<Product> {
    return await this.productsService.getProductById(id, user);
  }

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: UserMetadata,
  ): Promise<Product> {
    return await this.productsService.createProduct(createProductDto, user);
  }

  @Patch('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: UserMetadata,
  ): Promise<Product> {
    return await this.productsService.updateProduct(id, updateProductDto, user);
  }

  @Delete('/:id')
  async deleteProduct(
    @Param('id') id: string,
    @GetUser() user: UserMetadata,
  ): Promise<void> {
    return await this.productsService.deleteProduct(id, user);
  }
}
