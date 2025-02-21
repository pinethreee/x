import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Llm } from '@app/llm/entities/llm.entity';
import { LlmController } from '@app/llm/llm.controller';
import { LlmService } from '@app/llm/llm.service';
import { LlmRepository } from '@app/llm/repositories/llm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Llm])],
  controllers: [LlmController],
  providers: [LlmService, LlmRepository],
  exports: [LlmService],
})
export class LlmModule {}
