import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { Roles } from '@app/common/decorators/roles.decorator';
import { Workspace } from '@app/common/decorators/workspace.decorator';
import { ResponseDto } from '@app/common/dto/response.dto';
import { FindAllTemplateDto } from '@app/template/dto/find-all-template.dto';
import { TemplateService } from '@app/template/template.service';
import { MemberRole } from '@app/types/common/base.type';

@ApiTags('Template')
@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  @Roles(MemberRole.MEMBER)
  @ApiOperation({ summary: 'Get all templates' })
  async findAll(
    @Workspace() workspace: { id: string },
    @Query() query: FindAllTemplateDto,
  ) {
    const result = await this.templateService.findAll(workspace.id, query);
    return ResponseDto.success(result);
  }
}
