import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    printConsoleTrace: true,
    bail: 5,
    clearMocks: true,
    cache: false,
    coverage: {
      exclude: [
        'coverage/**',
        'dist/**',
        'public/**',
        'files/**',
        '**/node_modules/**',
        '**/[.]**',
        'packages/*/test?(s)/**',
        '**/*.d.ts',
        '**/virtual:*',
        '**/__x00__*',
        '**/\x00*',
        './lib?(s)/**',
        'test?(s)/**',
        'test?(-*).?(c|m)[jt]s?(x)',
        '**/**/index.ts',
        '**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
        '**/vitest.{workspace,projects}.[jt]s?(on)',
        '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
      ],
      clean: true,
      enabled: true,
      thresholds: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
      provider: 'v8',
    },
    environment: 'node',
    setupFiles: ['./tests/vitest.setup.ts'],
  },
  plugins: [tsconfigPaths()],
})
