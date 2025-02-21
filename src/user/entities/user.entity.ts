import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

import { Provider } from '@app/types/common/base.type';

@Entity('User')
export class User {
  @PrimaryColumn()
  @Index('idx_pid')
  pid: string;

  @Column({ length: 256, default: 'public' })
  @Index('idx_domain')
  domain: string;

  @Column({ length: 512, default: 'OAuthLoginAccount' })
  password: string;

  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.TIMBLO,
  })
  @Index('idx_provider')
  provider: Provider;

  @Column({ type: 'datetime', precision: 3, nullable: true })
  lastLogin: Date | null;

  @Column({
    type: 'datetime',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createAt: Date;

  @Column({ type: 'datetime', precision: 3 })
  updateAt: Date;
}
