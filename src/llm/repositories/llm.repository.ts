import { Injectable, NotFoundException } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { CreateLlmDto } from '@app/llm/dto/create-llm.dto';
import { FindAllLlmDto } from '@app/llm/dto/find-all-llm.dto';
import { UpdateLlmDto } from '@app/llm/dto/update-llm.dto';
import { Llm } from '@app/llm/entities/llm.entity';
import { YesNo } from '@app/types/common/base.type';

@Injectable()
export class LlmRepository extends Repository<Llm> {
  constructor(private dataSource: DataSource) {
    super(Llm, dataSource.createEntityManager());
  }

  async createLlm(workspaceId: string, createLlmDto: CreateLlmDto) {
    const llm = this.create({
      ...createLlmDto,
      workspaceId,
      createAt: new Date(),
      updateAt: new Date(),
    });
    return await this.save(llm);
  }

  async findAllLlms(workspaceId: string, options: FindAllLlmDto) {
    const { page = 1, row = 10, vendorId, keyword } = options;

    const queryBuilder = this.createQueryBuilder('llm')
      .leftJoinAndSelect('llm.vendor', 'vendor')
      .where('llm.workspaceId = :workspaceId', { workspaceId })
      .andWhere('llm.isDeleted = :isDeleted', { isDeleted: YesNo.N });

    if (vendorId) {
      queryBuilder.andWhere('llm.vendorId = :vendorId', { vendorId });
    }

    if (keyword) {
      queryBuilder.andWhere(
        '(llm.codeName LIKE :keyword OR llm.name LIKE :keyword)',
        { keyword: `%${keyword}%` },
      );
    }

    const [llms, total] = await queryBuilder
      .skip((page - 1) * row)
      .take(row)
      .getManyAndCount();

    return {
      count: total,
      totalPage: Math.ceil(total / row),
      llms,
    };
  }

  async findOneLlm(id: string, workspaceId: string) {
    const llm = await this.findOne({
      where: {
        id,
        workspaceId,
        isDeleted: YesNo.N,
      },
    });

    if (!llm) {
      throw new NotFoundException(`LLM #${id} not found`);
    }

    return llm;
  }

  async updateLlm(id: string, workspaceId: string, updateLlmDto: UpdateLlmDto) {
    await this.update(
      { id, workspaceId, isDeleted: YesNo.N },
      {
        ...updateLlmDto,
        updateAt: new Date(),
      },
    );

    return this.findOneLlm(id, workspaceId);
  }

  async removeLlm(id: string, workspaceId: string) {
    const llm = await this.findOneLlm(id, workspaceId);

    llm.isDeleted = YesNo.Y;
    llm.updateAt = new Date();

    await this.save(llm);
  }

  async findAllWithVendor() {
    return this.createQueryBuilder('llm')
      .leftJoinAndSelect('llm.vendor', 'vendor')
      .where('llm.isDeleted = :isDeleted', { isDeleted: 'N' })
      .getMany();
  }

  // 다른 커스텀 쿼리 메서드들...
}
