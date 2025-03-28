import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';


export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { files: ['**/*.{js,mjs,cjs,ts,vue}'], languageOptions: { globals: globals.browser } },
  { files: ['**/*.{js,mjs,cjs,ts,vue}'], plugins: { js }, extends: ['js/recommended'] },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    rules: {
        //'vue/component-tags-order': ['error', {
           // order: ['script', 'template', 'style']
       // }],
        'arrow-spacing': ['error', { 'before': true, 'after': true }],
        'brace-style': ['error', '1tbs'],
        'comma-dangle': ['error', 'always-multiline'],
        //'line-comment-position': ['error', 'always'],
        //'array-bracket-newline': ['error', 'consistent'],
        'eqeqeq': ['error', 'always'],
        'indent': ['error', 2],
        'no-eval': ['error'],
        'no-trailing-spaces': ['error'],
        'no-unused-vars': ['error'],
        'no-var': ['error'],
        'prefer-const': ['error'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'keyword-spacing': ['error', { "overrides": { "if": { "after": false }, "for": { "after": false }, "while": { "after": false }, "static": { "after": false }, "as": { "after": false } } } ]
    }
}
]);

