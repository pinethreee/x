import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { MemberRole } from '@app/types/common/base.type';
import { AuthenticatedRequest } from '@app/types/common/request.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<MemberRole>(
      'role',
      context.getHandler(),
    );

    // @Role() 없으면 접근 허용
    if (!requiredRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    ////////////////////////////
    //TODO 추후 제거
    if (!request.auth) {
      request.auth = {
        isAuthorized: true,
        member: {
          role: MemberRole.OWNER,
          workspace: {
            id: '0aacac42-5808-4e33-b2e5-5c07ec362618',
          },
        },
      };
    }
    ////////////////////////////

    const { auth } = request;

    if (!auth?.isAuthorized || !auth?.member?.role) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    switch (requiredRole) {
      case MemberRole.OWNER: // 소유자만 접근 가능
        return [MemberRole.OWNER].includes(auth.member.role);
      case MemberRole.ADMIN: // 소유자, 관리자만 접근 가능
        return [MemberRole.OWNER, MemberRole.ADMIN].includes(auth.member.role);
      case MemberRole.MEMBER:
        return [MemberRole.OWNER, MemberRole.ADMIN, MemberRole.MEMBER].includes(
          auth.member.role,
        );
      case MemberRole.GUEST:
        return [
          MemberRole.OWNER,
          MemberRole.ADMIN,
          MemberRole.MEMBER,
          MemberRole.GUEST,
        ].includes(auth.member.role);
      default:
        return false;
    }
  }
}
