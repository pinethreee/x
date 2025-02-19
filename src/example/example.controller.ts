import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateExampleDto } from '@app/example/dto/create-example.dto';
import { UpdateExampleDto } from '@app/example/dto/update-example.dto';
import { Example } from '@app/example/entities/example.entity';
import { ExampleService } from '@app/example/example.service';

@ApiTags('예시')
@Controller('examples')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  @ApiOperation({ summary: '데이터 생성' })
  @ApiResponse({
    status: 201,
    description: '새로운 데이터가 생성됨',
    type: Example,
  })
  create(@Body() createExampleDto: CreateExampleDto) {
    return this.exampleService.create(createExampleDto);
  }

  @Get()
  @ApiOperation({ summary: '데이터 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '데이터 목록',
    type: [Example],
  })
  findAll() {
    return this.exampleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '데이터 상세 조회' })
  @ApiResponse({
    status: 200,
    description: '데이터 상세 정보',
    type: Example,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.exampleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '데이터 수정' })
  @ApiResponse({
    status: 200,
    description: '데이터가 수정됨',
    type: Example,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExampleDto: UpdateExampleDto,
  ) {
    return this.exampleService.update(id, updateExampleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '데이터 삭제' })
  @ApiResponse({
    status: 200,
    description: '데이터가 삭제됨',
    type: Object,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exampleService.remove(id);
  }
}
