import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
  UseFilters,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { RolesGuard } from '@app/auth/guards/roles.guard';
import { Roles } from '@app/common/decorators/roles.decorator';
import { Workspace } from '@app/common/decorators/workspace.decorator';
import { ResponseDto } from '@app/common/dto/response.dto';
import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';
import { CreateLlmDto } from '@app/llm/dto/create-llm.dto';
import { FindAllLlmDto } from '@app/llm/dto/find-all-llm.dto';
import { FindAllVendorDto } from '@app/llm/dto/find-all-vendor.dto';
import { UpdateLlmDto } from '@app/llm/dto/update-llm.dto';
import { LlmService } from '@app/llm/llm.service';
import { MemberRole } from '@app/types/common/base.type';

@ApiTags('LLM')
@Controller('llm')
@UseGuards(RolesGuard)
@UseFilters(HttpExceptionFilter)
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Get('vendors')
  @Roles(MemberRole.OWNER)
  @ApiOperation({ summary: 'Get all LLM vendors' })
  async findAllVendors(@Query() query: FindAllVendorDto) {
    const result = await this.llmService.findAllVendors(query);
    return ResponseDto.success(result);
  }

  @Post()
  @Roles(MemberRole.OWNER)
  @ApiOperation({ summary: 'Create LLM' })
  @ApiResponse({ status: 201, description: 'LLM created successfully' })
  async create(
    @Workspace() workspace: { id: string },
    @Body() createLlmDto: CreateLlmDto,
  ) {
    const result = await this.llmService.create(workspace.id, createLlmDto);
    return ResponseDto.success(result);
  }

  @Get()
  @Roles(MemberRole.OWNER)
  @ApiOperation({ summary: 'Get all LLMs' })
  async findAll(
    @Workspace() workspace: { id: string },
    @Query() query: FindAllLlmDto,
  ) {
    const result = await this.llmService.findAll(workspace.id, query);
    return ResponseDto.success(result);
  }

  @Get(':id')
  @Roles(MemberRole.OWNER)
  @ApiOperation({ summary: 'Get LLM by ID' })
  async findOne(
    @Param('id') id: string,
    @Workspace() workspace: { id: string },
  ) {
    const result = await this.llmService.findOne(id, workspace.id);
    return ResponseDto.success(result);
  }

  @Put(':id')
  @Roles(MemberRole.OWNER)
  @ApiOperation({ summary: 'Update LLM' })
  async update(
    @Param('id') id: string,
    @Workspace() workspace: { id: string },
    @Body() updateLlmDto: UpdateLlmDto,
  ) {
    const result = await this.llmService.update(id, workspace.id, updateLlmDto);
    return ResponseDto.success(result);
  }

  @Delete(':id')
  @Roles(MemberRole.OWNER)
  @ApiOperation({ summary: 'Delete LLM' })
  @ApiResponse({ status: 204, description: 'LLM deleted successfully' })
  async remove(
    @Param('id') id: string,
    @Workspace() workspace: { id: string },
  ) {
    await this.llmService.remove(id, workspace.id);
    return ResponseDto.success(null);
  }
}
