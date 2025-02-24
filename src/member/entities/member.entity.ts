import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { MemberRole } from '@app/types/common/base.type';
import { User } from '@app/user/entities/user.entity';
import { Workspace } from '@app/workspace/entities/workspace.entity';

@Entity('Member')
export class Member {
  @PrimaryColumn()
  id: string;

  @Column()
  @Index('idx_workspaceId')
  workspaceId: string;

  @Column()
  @Index('idx_pid')
  pid: string;

  @Column({
    type: 'enum',
    enum: MemberRole,
    default: MemberRole.MEMBER,
  })
  role: MemberRole;

  @Column({
    type: 'datetime',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createAt: Date;

  @Column({ type: 'datetime', precision: 3 })
  updateAt: Date;

  @ManyToOne(() => User, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'pid' })
  user: User;

  @ManyToOne(() => Workspace, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'workspaceId' })
  workspace: Workspace;
}
