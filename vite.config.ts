import type { UserConfig as VitestConfig } from 'vitest/node'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'

import { defineConfig } from 'vite'

export default defineConfig({
  test: { globals: true, environment: 'jsdom' } as VitestConfig,
  plugins: [
    vue(),
    AutoImport({
      dts: true,
      imports: ['vue'],
      eslintrc: {
        enabled: true,
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
