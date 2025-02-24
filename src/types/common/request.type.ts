import { Request } from 'express';

import { MemberRole } from '@app/types/common/base.type';

export interface AuthenticatedRequest extends Request {
  user: {
    workspaces: { id: string }[];
  };
  auth: {
    isAuthorized: boolean;
    member: {
      role: MemberRole;
      workspace: {
        id: string;
      };
    };
  };
}
