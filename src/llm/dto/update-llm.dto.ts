import { PartialType } from '@nestjs/swagger';

import { CreateLlmDto } from '@app/llm/dto/create-llm.dto';

export class UpdateLlmDto extends PartialType(CreateLlmDto) {}
