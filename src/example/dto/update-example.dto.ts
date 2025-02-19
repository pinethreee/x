import { PartialType } from '@nestjs/swagger';

import { CreateExampleDto } from '@app/example/dto/create-example.dto';

export class UpdateExampleDto extends PartialType(CreateExampleDto) {}
