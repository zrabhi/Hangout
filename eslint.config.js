import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";
import prettierPlugin from "eslint-plugin-prettier";
import unicornPlugin from "eslint-plugin-unicorn";
import typescriptESLintPlugin from "@typescript-eslint/eslint-plugin";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import typescriptParser from "@typescript-eslint/parser";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import reactCompilerPlugin from "eslint-plugin-react-compiler";
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    ignores: [
      "node_modules/**",
      ".*",
      "*.config.js",
      "ios/**",
      "android/**",
      "babel.config.js",
      "metro.config.js",
      "env.js",
      "jest.config.js",
      "native.config.js",
      "src/utils/Env.js",
    ],
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      "react-native": reactNative,
      'prettier': prettierPlugin,
      'unicorn': unicornPlugin,
      "@typescript-eslint": typescriptESLintPlugin,
      "unused-imports": unusedImportsPlugin,
      'tailwindcss': tailwindcssPlugin,
      "simple-import-sort": simpleImportSortPlugin,
      "react-compiler": reactCompilerPlugin,
    },

    rules: {
      "react-native/no-inline-styles": "error",

      "react-native/no-unused-styles": "error",

      "react-native/no-raw-text": [
        "error",
        {
          skip: ["ThemedText"],
        },
      ],
      "react-native/no-single-element-style-arrays": "error",

      "no-console": "warn",
      "unused-imports/no-unused-imports": "error",
      "max-params": ["error", 3],
     
      "simple-import-sort/exports": "error",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
          disallowTypeAnnotations: true,
        },
      ],


      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      "unused-imports/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "react-native/no-color-literals": "warn",
      "tailwindcss/classnames-order": [
        "warn",
        {
          officialSorting: true,
        },
      ],
      "max-lines-per-function": ["error", 180],
      // 'react-native/split-platform-components': ['error', {
      //   message: '❌ Name platform-specific components using .ios.js or .android.js suffixes.',
      //  }],

      // 'react-native/sort-styles': ['error', 'asc', {
      //   ignoreClassNames: false,
      //   ignoreStyleProperties: false,
      //   message: '❌ Style properties should be sorted alphabetically.',
      // }],
    },
  },
];