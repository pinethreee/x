import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { LlmVendor } from '@app/llm/entities/llm-vendor.entity';

@Injectable()
export class LlmVendorRepository extends Repository<LlmVendor> {
  constructor(private dataSource: DataSource) {
    super(LlmVendor, dataSource.createEntityManager());
  }

  async findAllVendors(): Promise<LlmVendor[]> {
    return this.find({
      order: {
        name: 'ASC',
        model: 'ASC',
      },
    });
  }
}
