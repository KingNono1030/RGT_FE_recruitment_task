import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  ...compat.extends(
    'eslint:recommended', // 공통 권장 규칙
    'plugin:@typescript-eslint/recommended', // 타입스크립트 권장 규칙
    'prettier' // Prettier와 통합
  ),
  {
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },
]
