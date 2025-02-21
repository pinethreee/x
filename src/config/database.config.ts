import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { LlmVendor } from '@app/llm/entities/llm-vendor.entity';
import { Llm } from '@app/llm/entities/llm.entity';
import { User } from '@app/user/entities/user.entity';
import { Workspace } from '@app/workspace/entities/workspace.entity';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: configService.get<string>('DB_TYPE') as 'mariadb' | 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [Llm, LlmVendor, Workspace, User],
  synchronize: false,
});
