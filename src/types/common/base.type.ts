// 데이터베이스나 시스템 전반에 걸쳐 사용되는 기본적인 type

export enum YesNo {
  Y = 'Y',
  N = 'N',
}

export enum MemberRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST',
}

export enum Provider {
  TIMBLO = 'timblo',
  GOOGLE = 'google',
  APPLE = 'apple',
}
