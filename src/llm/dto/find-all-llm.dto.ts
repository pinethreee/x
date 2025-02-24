import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsString } from 'class-validator';

import { LlmVendor } from '@app/llm/entities/llm-vendor.entity';
import { Llm } from '@app/llm/entities/llm.entity';

export class LlmVendorResponseDto {
  name: string;
  model: string;

  constructor(vendor: LlmVendor) {
    this.name = vendor.name;
    this.model = vendor.model;
  }
}

export class LlmResponseDto {
  id: string;
  codeName: string;
  vendor: LlmVendorResponseDto | null;
  params: Record<string, unknown>;
  url: string;
  key: string;

  constructor(llm: Llm) {
    this.id = llm.id;
    this.codeName = llm.codeName;
    this.vendor = llm.vendor ? new LlmVendorResponseDto(llm.vendor) : null;
    this.params = llm.params;
    this.url = llm.url;
    this.key = llm.key;
  }
}

export class LlmListResponseDto {
  count: number;
  totalPage: number;
  llms: LlmResponseDto[];

  constructor(count: number, totalPage: number, llms: Llm[]) {
    this.count = count;
    this.totalPage = totalPage;
    this.llms = llms.map((llm) => new LlmResponseDto(llm));
  }
}

export class FindAllLlmDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  row?: number;

  @IsOptional()
  @IsString()
  vendorId?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  keyword?: string;

  // @IsOptional()
  // @Type(() => Boolean)
  // @IsBoolean()
  // isList?: boolean;
}
