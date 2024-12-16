import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default [
  ...compat.extends(
    'next/core-web-vitals', // Next.js 권장 규칙
    'next/typescript' // Next.js 타입스크립트 규칙
  ),
]
