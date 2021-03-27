import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ProductModel } from './product.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: ModelType<ProductModel>,
  ) {}

  async create(dto: ProductModel): Promise<DocumentType<ProductModel>> {
    return this.productModel.create(dto);
  }

  async findProductById(
    id: string,
  ): Promise<DocumentType<ProductModel> | null> {
    return this.productModel.findById(id).exec();
  }

  async delete(id: string): Promise<DocumentType<ProductModel> | null> {
    return this.productModel.findByIdAndDelete(id);
  }

  async patch(
    id: string,
    dto: ProductModel,
  ): Promise<DocumentType<ProductModel> | null> {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findMany(dto: FindProductDto): Promise<DocumentType<ProductModel>[]> {
    return this.productModel.find({ dto }).exec();
  }
}
