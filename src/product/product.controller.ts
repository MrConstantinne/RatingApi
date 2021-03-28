import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUND } from './product.constants';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() dto: ProductModel) {
    return this.productService.create(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.productService.findProductById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleteDoc = await this.productService.delete(id);
    if (!deleteDoc) {
      throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModel) {
    return this.productService.patch(id, dto);
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProductDto) {
    return this.productService.findMany(dto);
  }
}
