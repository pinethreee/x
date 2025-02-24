import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateLlmDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  codeName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vendorId: string;

  @ApiProperty({
    type: 'object',
    additionalProperties: true,
  })
  @IsObject()
  @IsNotEmpty()
  params: {
    temperature: {
      min: number;
      max: number;
      default: number;
      step: number;
      isUse: boolean;
    };
    max_tokens: {
      min: number;
      max: number;
      default: number;
      step: number;
      isUse: boolean;
    };
    top_p: {
      min: number;
      max: number;
      default: number;
      step: number;
      isUse: boolean;
    };
    frequency_penalty: {
      min: number;
      max: number;
      default: number;
      step: number;
      isUse: boolean;
    };
    presence_penalty: {
      min: number;
      max: number;
      default: number;
      step: number;
      isUse: boolean;
    };
    stop: {
      default: string[];
      isUse: boolean;
    };
    seed: {
      default: number | null;
      isUse: boolean;
    };
  };

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  organization?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  project?: string;
}
