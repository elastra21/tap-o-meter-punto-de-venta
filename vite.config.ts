/// <reference types="vitest" />

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vuetify from "@vuetify/vite-plugin"

import {builtinModules} from 'module';

import { fileURLToPath, URL } from "url"

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.ELECTRON == "true" ? "./" : "",
  plugins: [
    {
      name: "vitest-plugin-beforeall",
      config: () => ({
        test: { setupFiles: ["./vitest/beforeall.ts"] },
      }),
    },
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [
      ".js",
      ".json",
      ".jsx",
      ".mjs",
      ".ts",
      ".tsx",
      ".vue",
      ".css",
      ".scss",
    ],
  },
  test: {
    globals: true,
    globalSetup: ["./vitest/setup.ts"],
    environment: "jsdom",
    deps: {
      inline: ["vuetify"],
    },
  }
  // ,build: {
  //   sourcemap: true,
  //   target: `chrome96`,
  //   outDir: 'dist',
  //   assetsDir: '.',
  //   rollupOptions: {
  //     external: [
  //       ...builtinModules,
  //     ],
  //   },
  //   emptyOutDir: true,
  //   brotliSize: false,
  // }
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
})
