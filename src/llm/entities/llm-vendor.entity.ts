import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('LLMVendor')
export class LlmVendor {
  @Column({ unique: true })
  id: string;

  @PrimaryColumn({ length: 128 })
  @Index('idx_name')
  name: string;

  @PrimaryColumn({ length: 128 })
  @Index('idx_model')
  model: string;

  @Column('json')
  params: Record<string, unknown>;

  @Column({
    type: 'datetime',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createAt: Date;

  @Column({ type: 'datetime', precision: 3 })
  updateAt: Date;
}
