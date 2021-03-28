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
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { TOP_PAGE_NOT_FOUND } from './top-page.constants';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @Post('create')
  async create(@Body() dto: TopPageModel) {
    return this.topPageService.create(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.topPageService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.topPageService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(TOP_PAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: TopPageModel) {
    return this.topPageService.patch(id, dto);
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findMany(dto);
  }
}
