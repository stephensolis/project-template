import js from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import { importX } from "eslint-plugin-import-x";
import jestDom from "eslint-plugin-jest-dom";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import reactHooks from "eslint-plugin-react-hooks";
import { reactRefresh } from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import testingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores(["dist", "src/services"]),

  {
    extends: [js.configs.recommended, importX.flatConfigs.recommended],
    plugins: { "simple-import-sort": simpleImportSort },
    settings: {
      "import-x/resolver-next": [createTypeScriptImportResolver()]
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import-x/first": "error",
      "import-x/newline-after-import": "error",

      "no-console": ["warn", { allow: ["error"] }],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "object-shorthand": "warn",
      "prefer-template": "warn"
    }
  },

  {
    files: ["**/*.js"],
    languageOptions: { globals: globals.node }
  },

  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      importX.flatConfigs.typescript,
      eslintReact.configs["recommended-type-checked"],
      reactHooks.configs.flat.recommended,
      eslintReact.configs["disable-conflict-eslint-plugin-react-hooks"],
      reactRefresh.configs.vite()
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      "import-x/default": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }
      ]
    }
  },

  {
    files: ["src/**/*.{test,spec}.{ts,tsx}", "test/**/*.{ts,tsx}"],
    extends: [testingLibrary.configs["flat/react"], jestDom.configs["flat/recommended"]]
  },

  prettierRecommended
);
