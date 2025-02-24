## 프로젝트 소개

[Nest](https://github.com/nestjs/nest) 프레임워크를 기반으로 한 TypeScript 스켈레톤 프로젝트입니다.

### 주요 기술 스택

#### 핵심 프레임워크 및 라이브러리
- [NestJS](https://nestjs.com/) - 메인 프레임워크
- [TypeORM](https://typeorm.io/) - ORM
- [Winston](https://github.com/winstonjs/winston) - 로깅
- [Joi](https://joi.dev/) - 환경변수 유효성 검사
- [class-validator](https://github.com/typestack/class-validator) - DTO 유효성 검사
- [class-transformer](https://github.com/typestack/class-transformer) - 객체 변환
- [Axios](https://axios-http.com/) - HTTP 클라이언트

#### 개발 도구
- [pnpm](https://pnpm.io/) - 패키지 매니저
- [Husky](https://typicode.github.io/husky/) - Git hooks
- [Commitlint](https://commitlint.js.org/) - 커밋 메시지 검사

### Git 커밋 메시지 규칙

본 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따르며,
자세한 커밋 메시지 가이드는 [.gitcommitmsg](.gitcommitmsg)를 참고해 주세요.

### 주요 프로젝트 구조

```bash
.
├── src/
│   ├── common/              # 공통 모듈
│   │   ├── decorators/      # 커스텀 데코레이터
│   │   ├── filters/         # 예외 필터
│   │   ├── guards/          # 가드
│   │   ├── interceptors/    # 인터셉터
│   │   ├── middlewares/     # 미들웨어
│   │   └── pipes/           # 파이프
│   │
│   ├── config/             # 환경 설정
│   │   ├── rdb.config.ts
│   │   ├── mongodb.config.ts
│   │   ├── validation.config.ts
│   │   └── winston.config.ts
│   │
│   ├── types/             # 전역 타입 정의
│   │   ├── common/        # 공통 타입
│   │   └── user/         # 사용자 관련 공유 타입
│   │
│   ├── app.module.ts      # 루트 모듈
│   └── main.ts           # 애플리케이션 엔트리 포인트
```

### 도메인 모듈 구조 예시

각 도메인 모듈은 다음과 같은 구조를 따릅니다:

```bash
user/                    # 사용자 모듈 예시
├── dto/                  # DTO 클래스
├── entities/             # 엔티티 클래스
├── guards/               # 모듈 전용 가드
├── interceptors/         # 모듈 전용 인터셉터
├── filters/              # 모듈 전용 필터
├── middlewares/          # 모듈 전용 미들웨어
├── decorators/           # 모듈 전용 데코레이터
├── user.controller.ts   # 컨트롤러
├── user.service.ts      # 서비스
├── user.module.ts       # 모듈 정의
└── user.service.spec.ts # 테스트
```

#### 타입 관리 가이드
- `src/types/`: 여러 모듈에서 공유되는 타입 정의
  - API 응답 공통 타입
  - 모듈 간 공유되는 인터페이스

새로운 도메인 모듈 생성 시 다음 명령어를 사용합니다:
```bash
$ nest g res {name}
$ nest g module {name}
$ nest g controller {name}
$ nest g service {name}
```

추가 요소가 필요한 경우:
```bash
$ nest g guard {name}/{name}
$ nest g interceptor {name}/{name}
$ nest g filter {name}/{name}
$ nest g middleware {name}/{name}
```