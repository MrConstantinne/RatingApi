import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TopPageModel } from './top-page.model';
import {
  BeAnObject,
  DocumentType,
  ModelType,
} from '@typegoose/typegoose/lib/types';
import { DocumentQuery, Types } from 'mongoose';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel)
    private readonly topPageModel: ModelType<TopPageModel>,
  ) {}

  async create(dto: TopPageModel): Promise<DocumentType<TopPageModel>> {
    return this.topPageModel.create(dto);
  }

  async findOne(id: string): Promise<DocumentType<TopPageModel> | null> {
    return this.topPageModel.findById({ id: Types.ObjectId(id) }).exec();
  }

  async findMany(
    dto: FindTopPageDto,
  ): Promise<
    DocumentQuery<
      DocumentType<TopPageModel>[],
      DocumentType<TopPageModel>,
      BeAnObject
    > &
      BeAnObject
  > {
    return this.topPageModel.find(dto).exec();
  }

  async delete(id: string): Promise<DocumentType<TopPageModel> | null> {
    return this.topPageModel.findByIdAndDelete(id);
  }

  async patch(
    id: string,
    dto: TopPageModel,
  ): Promise<DocumentType<TopPageModel> | null> {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
