import globals from "globals";
import pluginJs from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import typescriptParser from '@typescript-eslint/parser';
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
// react-hookの設定反映のため 参考:https://github.com/t3-oss/create-t3-turbo/issues/984#issuecomment-2210934687
import { fixupPluginRules } from "@eslint/compat";


export default [
  {// 対象外の一覧
    ignores: ['node_modules', 'build', '.env*'],
  },
  {// react用の設定
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      indent: [
        "error",
        4,
        {
          "ignoredNodes": [
            "ConditionalExpression"
          ],
          "SwitchCase": 1
        }
      ],
      semi: [
        "error",
        "always"
      ],
      quotes: [
        "warn",
        "single",
        {
          "avoidEscape": true
        }
      ],
      "no-tabs": [
        "error"
      ],
      "no-irregular-whitespace": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/label-has-associated-control": "off"
    },
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      ...reactPlugin.configs.flat['jsx-runtime'].languageOptions,
      globals: {
        ...globals.browser,
        ...globals.es2015,
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json"
      }
    },
    plugins: {
      react: reactPlugin,
      ['jsx-a11y']: jsxA11yPlugin,
      'react-hooks': fixupPluginRules(reactHooksPlugin),
      "@typescript-eslint": typescriptEslint,
    },
    settings: {
      react: {
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
      "import/resolver": {
        typescript: {},
      },
    },
  },
];