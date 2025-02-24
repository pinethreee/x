import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  TemplateModule as TemplateModuleSchema,
  TemplateModuleSchema as TemplateModuleSchemaFactory,
} from '@app/template/schemas/template-module.schema';
import {
  TemplateRevision,
  TemplateRevisionSchema,
} from '@app/template/schemas/template-revision.schema';
import {
  Template,
  TemplateSchema,
} from '@app/template/schemas/template.schema';
import { TemplateController } from '@app/template/template.controller';
import { TemplateService } from '@app/template/template.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Template.name, schema: TemplateSchema },
      { name: TemplateRevision.name, schema: TemplateRevisionSchema },
      { name: TemplateModuleSchema.name, schema: TemplateModuleSchemaFactory },
    ]),
  ],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
