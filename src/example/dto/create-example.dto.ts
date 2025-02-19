import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateExampleDto {
  @ApiProperty({ description: '제목', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiProperty({ description: '내용' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: '상태',
    enum: ['DRAFT', 'PUBLISHED'],
    required: false,
  })
  @IsEnum(['DRAFT', 'PUBLISHED'])
  @IsOptional()
  status?: 'DRAFT' | 'PUBLISHED';

  @ApiProperty({
    description: '메타데이터',
    required: false,
    example: { tags: ['tag1', 'tag2'], category: 'test' },
  })
  @IsObject()
  @IsOptional()
  @Type(() => Object)
  metadata?: Record<string, any>;
}
