import { SetMetadata } from '@nestjs/common';

import { MemberRole } from '@app/types/common/base.type';

export const Roles = (role: MemberRole) => SetMetadata('role', role);
