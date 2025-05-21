# DBI project ![Last Commit](https://img.shields.io/github/last-commit/Isabella1807/DBI-project?style=for-the-badge)

A modern frontend project for **DBI Egenkontrol**, built with Vue 3 (Composition API) and tools like *TypeScript* for type safety, *Pinia* for state management, *SCSS* for modular styling, and *ESLint* to ensure code consistency.

During development, we focused on writing clean and consistent code, using reusable components and maintaining a modular structure.

## Built with

[![Vue][vue-badge]][vue-url]
[![Vite][vite-badge]][vite-url]
[![TypeScript][ts-badge]][ts-url]
[![Pinia][pinia-badge]][pinia-url]
[![Sass][sass-badge]][sass-url]
[![ESLint][eslint-badge]][eslint-url]
[![Cypress][cypress-badge]][cypress-url]
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

[firebase-badge]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black
[firebase-url]: https://firebase.google.com/

## Getting Started

### Project Install

``` sh
npm install
```

### Start development server

```sh
npm run dev
```

## Usage
### Login
To log in to the application, you can use one of the following test accounts:


| User     | Username           | Password |
|----------|--------------------|----------|
| User 1   | `user1@mail.com`   | `123456` |
| User 2   | `user2@mail.com`   | `123456` |


## Project Structure
```
src/
├── assets/styles          # Global and main styling (SCSS)
├── components/            # Reusable Vue components (Atomic Design)
├── configs/               # Configuration files (e.g. Firebase)
├── router/index.ts        # App routing configuration
├── services/              # Firestore logic
├── stores/                # Pinia stores for state management
├── types/                 # Global TypeScript types and interfaces
├── views/                 # Route-based page components
├── App.vue                # Root component
└── main.ts                # App entry point
```
## Other useful commands
### Compile for production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Deployment
The project is run using **Firebase Hosting**. A GitHub Actions workflow is set up to automatically deploy the site when changes are pushed to the `main` branch.

### Manual deploy using firebase CLI
To deploy manually using firebase follow these steps:
1. Install Firebase CLI globally:
    ```sh
    npm install -g firebase-tools
    ```

2. Log in to Firebase:
    ```sh
    firebase login
    ```

3. Build the project (generates a `dist/` folder):
    ```sh
    npm run build
    ```

4. Deploy to Firebase Hosting:
    ```sh
    firebase deploy --only hosting
    ```
## Contributors
[![](https://contrib.rocks/image?repo=Isabella1807/DBI-project)](https://github.com/Isabella1807/DBI-project/graphs/contributors)
