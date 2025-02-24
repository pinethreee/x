import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = (
  configService: ConfigService,
): MongooseModuleOptions => ({
  uri: configService.get<string>('MONGODB_URI'),
  dbName: configService.get<string>('MONGODB_DATABASE'),
  retryAttempts: 3, // 연결 실패 시 재시도 횟수
  retryDelay: 1000, // 재시도 간격 (밀리초)
  autoCreate: false, // 컬렉션 자동 생성 (개발 환경 외 false)
  autoIndex: false, // 인덱스 자동 생성 (개발 환경 외 false)
});
