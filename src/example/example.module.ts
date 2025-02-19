import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Example } from '@app/example/entities/example.entity';
import { ExampleController } from '@app/example/example.controller';
import { ExampleService } from '@app/example/example.service';

@Module({
  imports: [TypeOrmModule.forFeature([Example])],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
