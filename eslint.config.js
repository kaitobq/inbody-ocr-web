import { default as eslint, default as pluginJs } from "@eslint/js"
import reactPlugin from "eslint-plugin-react"
import hooksPlugin from "eslint-plugin-react-hooks"

import { fixupPluginRules } from "@eslint/compat"

export default [
  eslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  pluginJs.configs.recommended,
  // .jsの設定
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "script" },
    rules: {
      "no-console": { allow: ["warn", "error"] },
    },
  },
  // .mjsの設定
  {
    files: ["**/*.mjs"],
    languageOptions: { sourceType: "script" },
  },
  {
    plugins: {
      "react-hooks": fixupPluginRules(hooksPlugin),
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
    },
  },
]
