# DBI project

---
Beskrivelse wohoo


<pre><code>```js const hello = () => { console.log("Hej verden!"); } ```</code></pre>

<pre>`wohoo` </pre>
## Built with

[![Vue][vue-badge]][vue-url]
[![Vite][vite-badge]][vite-url]
[![TypeScript][ts-badge]][ts-url]
[![Pinia][pinia-badge]][pinia-url]
[![Sass][sass-badge]][sass-url]
[![ESLint][eslint-badge]][eslint-url]
[![Cypress][cypress-badge]][cypress-url]
[![Vitest][vitest-badge]][vitest-url]
[![Firebase][firebase-badge]][firebase-url]

[vue-badge]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D
[vue-url]: https://vuejs.org/

[vite-badge]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[vite-url]: https://vitejs.dev/

[ts-badge]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[ts-url]: https://www.typescriptlang.org/

[pinia-badge]: https://img.shields.io/badge/Pinia-2EBC4F?style=for-the-badge&logo=pinia&logoColor=white
[pinia-url]: https://pinia.vuejs.org/

[sass-badge]: https://img.shields.io/badge/Sass-hotpink?style=for-the-badge&logo=sass&logoColor=white
[sass-url]: https://sass-lang.com/

[eslint-badge]: https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white
[eslint-url]: https://eslint.org/

[cypress-badge]: https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white
[cypress-url]: https://www.cypress.io/

[vitest-badge]: https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge
[vitest-url]: https://vitest.dev/

[firebase-badge]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black
[firebase-url]: https://firebase.google.com/

>Citat wohoo

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
