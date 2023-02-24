import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMetadata } from 'src/auth/user-metadata.interface';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  private logger = new Logger('ProductsService', true);
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async getProducts(user: UserMetadata): Promise<Product[]> {
    try {
      const products = await this.productsRepository.find({
        select: ['id', 'name', 'description', 'price', 'stock'],
        where: { user_id: user.id },
      });
      return products;
    } catch (error) {
      this.logger.error(`Failed to get products for user ${user.username}`);
      throw error;
    }
  }

  async getProductById(id: string, user: UserMetadata): Promise<Product> {
    try {
      const product = await this.productsRepository.findOne({
        select: ['id', 'name', 'description', 'price', 'stock'],
        where: { id, user_id: user.id },
      });
      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      return product;
    } catch (error) {
      this.logger.error(
        `Failed to get product with id ${id} for user ${user.username}`,
      );
      throw error;
    }
  }
  async createProduct(
    createProductDto: CreateProductDto,
    user: UserMetadata,
  ): Promise<Product> {
    try {
      const product = this.productsRepository.create({
        ...createProductDto,
        user_id: user.id,
      });
      await this.productsRepository.save(product);
      return product;
    } catch (error) {
      this.logger.error(`Failed to create product for user ${user.username}`);
      throw error;
    }
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
    user: UserMetadata,
  ): Promise<Product> {
    try {
      const product = await this.getProductById(id, user);
      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      product.stock = updateProductDto.stock;
      await this.productsRepository.save(product);
      return product;
    } catch (error) {
      this.logger.error(`Failed to update product for user ${user.username}`);
      throw error;
    }
  }

  async deleteProduct(id: string, user: UserMetadata): Promise<void> {
    try {
      const result = await this.productsRepository.delete({
        id,
        user_id: user.id,
      });
      if (result.affected === 0) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }
      return;
    } catch (error) {
      this.logger.error(`Failed to delete product for user ${user.username}`);
      throw error;
    }
  }
}
