import { ApiProperty } from '@nestjs/swagger';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Example {
  @ApiProperty({ description: '고유 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '제목' })
  @Column({ length: 100 })
  title: string;

  @ApiProperty({ description: '내용' })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({ description: '상태', enum: ['DRAFT', 'PUBLISHED'] })
  @Column({
    type: 'enum',
    enum: ['DRAFT', 'PUBLISHED'],
    default: 'DRAFT',
  })
  status: 'DRAFT' | 'PUBLISHED';

  @ApiProperty({ description: '메타데이터' })
  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;

  @ApiProperty({ description: '생성일' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '수정일' })
  @UpdateDateColumn()
  updatedAt: Date;
}
