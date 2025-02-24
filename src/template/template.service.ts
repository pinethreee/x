import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { FindAllTemplateDto } from '@app/template/dto/find-all-template.dto';
import {
  Template,
  TemplateDocument,
} from '@app/template/schemas/template.schema';
import { TemplateFilter } from '@app/types/template/template.type';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<TemplateDocument>,
  ) {}

  //TODO mongoose 사용 예시로 작성함. 수정 필요.
  async findAll(workspaceId: string, query: FindAllTemplateDto) {
    const filter: TemplateFilter = {
      workspaceId,
      isDeleted: 'N',
    };

    if (query.search) {
      filter.title = { $regex: query.search, $options: 'i' };
    }

    return this.templateModel.find(filter).sort({ createAt: -1 }).exec();
  }
}
