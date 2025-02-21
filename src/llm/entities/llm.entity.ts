import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { LlmVendor } from '@app/llm/entities/llm-vendor.entity';
import { YesNo } from '@app/types/common/base.type';
import { Workspace } from '@app/workspace/entities/workspace.entity';

@Entity('LLM')
export class Llm {
  @PrimaryColumn()
  id: string;

  @Column({ length: 128, unique: true })
  codeName: string;

  @Column()
  vendorId: string;

  @ManyToOne(() => LlmVendor, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'vendorId' })
  vendor: LlmVendor;

  @Column('json')
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

  @Column({ length: 512 })
  url: string;

  @Column({ length: 512 })
  key: string;

  @Column({ length: 256, nullable: true })
  organization?: string;

  @Column({ length: 256, nullable: true })
  project?: string;

  @Column({ type: 'enum', enum: YesNo, default: YesNo.N })
  isDeleted: YesNo;

  @Column({
    type: 'datetime',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createAt: Date;

  @Column({ type: 'datetime', precision: 3 })
  updateAt: Date;

  @Column()
  workspaceId: string;

  @ManyToOne(() => Workspace, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'workspaceId' })
  workspace: Workspace;
}
