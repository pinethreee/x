import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능
        'fix', // 버그 수정
        'docs', // 문서 수정
        'style', // 코드 포맷팅
        'refactor', // 코드 리팩토링
        'test', // 테스트 코드
        'chore', // 기타 변경사항
        'build', // 빌드 관련 변경사항
        'ci', // CI/CD 관련 변경사항
        'perf', // 성능 개선
        'security', // 보안 관련 변경사항
        'revert', // 이전 커밋 되돌리기
        'wip', // 작업 중
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'body-leading-blank': [2, 'always'],
  },
};

export default Configuration;
