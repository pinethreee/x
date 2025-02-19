import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getDatabaseConfig } from '@app/config/database.config';
import { validationSchema } from '@app/config/validation.config';
import { ExampleModule } from '@app/example/example.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    ExampleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
