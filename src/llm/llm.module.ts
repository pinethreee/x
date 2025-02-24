import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LlmVendor } from '@app/llm/entities/llm-vendor.entity';
import { Llm } from '@app/llm/entities/llm.entity';
import { LlmController } from '@app/llm/llm.controller';
import { LlmService } from '@app/llm/llm.service';
import { LlmVendorRepository } from '@app/llm/repositories/llm-vendor.repository';
import { LlmRepository } from '@app/llm/repositories/llm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Llm, LlmVendor])],
  controllers: [LlmController],
  providers: [LlmService, LlmRepository, LlmVendorRepository],
  exports: [LlmService],
})
export class LlmModule {}
