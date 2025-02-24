import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { MonthlyWorkspaceStats } from '@app/workspace/entities/monthly-workspace-stats.entity';

@Injectable()
export class MonthlyWorkspaceStatsRepository extends Repository<MonthlyWorkspaceStats> {
  constructor(private dataSource: DataSource) {
    super(MonthlyWorkspaceStats, dataSource.createEntityManager());
  }

  async findByWorkspaceAndMonth(workspaceId: string, month: string) {
    return this.findOne({
      where: { workspaceId, month },
    });
  }
}
