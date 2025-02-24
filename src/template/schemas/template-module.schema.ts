import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

import { Module } from '@app/types/template/template.type';

export type TemplateModuleDocument = HydratedDocument<TemplateModule>;

@Schema({ collection: 'TemplateModule', timestamps: true })
export class TemplateModule {
  @Prop()
  workspaceId: string;

  @Prop({ type: Array<Module> })
  modules: Module[];

  @Prop({ default: Date.now })
  createAt: Date;

  @Prop({ default: Date.now })
  updateAt: Date;
}

export const TemplateModuleSchema =
  SchemaFactory.createForClass(TemplateModule);
