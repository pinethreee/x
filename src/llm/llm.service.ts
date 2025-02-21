import { Injectable, Logger } from '@nestjs/common';

import { CreateLlmDto } from '@app/llm/dto/create-llm.dto';
import {
  FindAllLlmDto,
  LlmListResponseDto,
} from '@app/llm/dto/find-all-llm.dto';
import { UpdateLlmDto } from '@app/llm/dto/update-llm.dto';
import { LlmRepository } from '@app/llm/repositories/llm.repository';

@Injectable()
export class LlmService {
  private readonly logger = new Logger(LlmService.name);

  constructor(private readonly llmRepository: LlmRepository) {}

  async create(workspaceId: string, createLlmDto: CreateLlmDto) {
    this.logger.debug(
      `Creating LLM for workspace ${workspaceId} with data: ${JSON.stringify(
        createLlmDto,
      )}`,
    );
    const result = await this.llmRepository.createLlm(
      workspaceId,
      createLlmDto,
    );
    this.logger.log(`Created LLM with ID: ${result.id}`);
    return result;
  }

  async findAll(workspaceId: string, options: FindAllLlmDto) {
    this.logger.debug(
      `Fetching LLMs for workspace ${workspaceId} with options: ${JSON.stringify(
        options,
      )}`,
    );
    const result = await this.llmRepository.findAllLlms(workspaceId, options);
    return new LlmListResponseDto(result.count, result.totalPage, result.llms);
  }

  async findOne(id: string, workspaceId: string) {
    this.logger.debug(`Fetching LLM ${id} for workspace ${workspaceId}`);
    return this.llmRepository.findOneLlm(id, workspaceId);
  }

  async update(id: string, workspaceId: string, updateLlmDto: UpdateLlmDto) {
    this.logger.debug(
      `Updating LLM ${id} for workspace ${workspaceId} with data: ${JSON.stringify(
        updateLlmDto,
      )}`,
    );
    const result = await this.llmRepository.updateLlm(
      id,
      workspaceId,
      updateLlmDto,
    );
    this.logger.log(`Updated LLM with ID: ${id}`);
    return result;
  }

  async remove(id: string, workspaceId: string) {
    this.logger.debug(`Removing LLM ${id} from workspace ${workspaceId}`);
    await this.llmRepository.removeLlm(id, workspaceId);
    this.logger.log(`Removed LLM with ID: ${id}`);
  }

  async findAllWithVendor() {
    this.logger.debug('Fetching all LLMs with vendor information');
    return this.llmRepository.findAllWithVendor();
  }
}
