import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

export class FindAllTemplateDto {
  @ApiPropertyOptional({ description: '검색어 (제목)' })
  @IsOptional()
  @IsString()
  search?: string;
}
