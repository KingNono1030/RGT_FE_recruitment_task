import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default [
  ...compat.extends({
    'eslint:recommended', // 기본 권장 규칙
    'plugin:@typescript-eslint/recommended', // 타입스크립트 규칙
    'plugin:node/recommended', // Node.js 관련 규칙
  }),
  {
    env: {
      node: true,
    },
    rules: {
      'no-console': 'off', // 백엔드는 로그를 사용할 수 있음
    },
  },
]
