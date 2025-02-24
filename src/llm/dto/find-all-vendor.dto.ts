import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

import { LlmVendor } from '@app/llm/entities/llm-vendor.entity';

export class FindAllVendorDto {
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isSearch?: boolean = false;
}

export class VendorResponseDto {
  id: string;
  model: string;
  params?: Record<string, unknown>;
  createAt?: Date;
  updateAt?: Date;

  constructor(vendor: LlmVendor, isSearch: boolean = false) {
    this.id = vendor.id;
    this.model = vendor.model;

    if (!isSearch) {
      this.params = vendor.params;
      this.createAt = vendor.createAt;
      this.updateAt = vendor.updateAt;
    }
  }
}

export class VendorGroupResponseDto {
  [vendorName: string]: VendorResponseDto[];
}
