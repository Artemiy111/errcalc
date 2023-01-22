import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import type { UserConfig as VitestConfig } from 'vitest'

import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

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
    Components({ dts: true }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
