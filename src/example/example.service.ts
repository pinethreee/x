import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateExampleDto } from '@app/example/dto/create-example.dto';
import { UpdateExampleDto } from '@app/example/dto/update-example.dto';
import { Example } from '@app/example/entities/example.entity';

@Injectable()
export class ExampleService {
  private readonly logger = new Logger(ExampleService.name);

  constructor(
    @InjectRepository(Example)
    private readonly exampleRepository: Repository<Example>,
  ) {}

  async create(createExampleDto: CreateExampleDto) {
    this.logger.debug(
      `Creating new example with title: ${createExampleDto.title}`,
    );

    const example = this.exampleRepository.create(createExampleDto);
    const result = await this.exampleRepository.save(example);

    this.logger.log(`Created example with ID: ${result.id}`);
    return result;
  }

  async findAll() {
    this.logger.debug('Fetching all examples');
    return this.exampleRepository.find();
  }

  async findOne(id: number) {
    this.logger.debug(`Fetching example with ID: ${id}`);

    const example = await this.exampleRepository.findOneBy({ id });
    if (!example) {
      this.logger.warn(`Example with ID ${id} not found`);
      throw new NotFoundException(`Example with ID ${id} not found`);
    }

    return example;
  }

  async update(id: number, updateExampleDto: UpdateExampleDto) {
    this.logger.debug(`Updating example with ID: ${id}`);

    const example = await this.findOne(id);
    Object.assign(example, updateExampleDto);

    const result = await this.exampleRepository.save(example);
    this.logger.log(`Updated example with ID: ${id}`);

    return result;
  }

  async remove(id: number) {
    this.logger.debug(`Removing example with ID: ${id}`);

    const example = await this.findOne(id);
    await this.exampleRepository.remove(example);

    this.logger.log(`Removed example with ID: ${id}`);
    return { id };
  }
}
