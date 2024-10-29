import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import tailwindcss from "eslint-plugin-tailwindcss"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      "**/node_modules/",
      "**/.next/",
      "**/.nuxt/",
      "**/.astro/",
      "**/build/",
      "**/dist/",
      "**/out/",
      "**/public/",
      "**/package-lock.json",
      "**/yarn.lock",
      "**/pnpm-lock.yaml",
      "**/vite.config.ts",
      "**/next.config.js",
      "**/tsconfig.json",
      "src/env.d.ts",
      "**/*.cjs",
      "**/*.mjs",
      "src/components/ui/*.tsx",
      "**/tailwind.config.ts",
    ],
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      tailwindcss,
    },

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      "object-shorthand": "error",
      "tailwindcss/no-custom-classname": "off",
      "react/jsx-curly-brace-presence": "error",

      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: false,
        },
      ],

      "@next/next/no-img-element": "off",
    },
  },
]
