
## Installation guide

### 1. Git initialization

As earlier to start to commit changes as easier will be to follow and check changes. So, create project on github: **project-name**

Then clone project from github:

```
git clone <github-project-url>
```

### 2. Setup new `Vite` - project
```
npm create vite <project-name>
  ? Select a framework: > React
  ? Select a variant: > TypeScript
cd <project-directory>
npm install
```

**Create a `.nvmrc` file**

Good to know the project version of Node

```
node --version > .nvmrc
```

This will create a file named .nvmrc with this content:

```
v23.5.0
```

Having done that, any developer can just run `nvm use` in the project folder and nvm will automatically switch to the correct version of node.


### 2. Install testing libraries to project**

```
npm install -D vitest
npm install -D @testing-library/react @testing-library/jest-dom jsdom
```

  1. `@testing-library/react` -> for component testing
  2. `@testing-library/jest-dom` -> for DOM assertions
  3. `jsdom` -> for simulating a browser environment in Node for testing purposes


Update a `vite.config.ts` file with next configuration:
  ```js
    import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
    import { defineConfig as defineVitestConfig } from 'vitest/config';

    const vitestConfig = defineVitestConfig({
      test: {
        globals: true,
        environment: 'jsdom'
      },
    });

    export default mergeConfig(viteConfig, vitestConfig);

  ```

Reason to modify `vite.config.ts`: Vite config interface does not 
  know anything about Vitest and TS does not allow excessive properties 
  (properties not defined by the type/interface). So Vitest must extend 
  Vite config (defined as TS interface). React has conflict in configuration 
  file if switch `config` import from `vite` to `vitest` and for this 
  reason better to use renamed imports.

Additional info about Vitest: https://vitest.dev/config/file.html


### 3. Check that project have a tsconfig.json..

.. (or **jsconfig.json**) to be sure that LSP - Language Service Protocol 
  (as VSCode, Sublime Text, etc.) - with allow LSP to recognize all 
  project files. 
  For more details read [doc](https://code.visualstudio.com/docs/languages/jsconfig#_why-do-i-need-a-jsconfigjson-file).


### 4. Relative Paths imports to project (optional)

Edit `vite.config.js`:

```js
  resolve: {
    alias: {
      'src': '/src',
      'assets': '/src/assets',
      'components': '/src/components',
      'constants': '/src/constants',
      'hooks': '/src/hooks',
      'layouts': '/src/layouts',
      'pages': '/src/pages',
      'services': '/src/services',
      'types': '/src/types',
    },
  },
```

Edit `tsconfig.app.json` and `tsconfig.node.json`:

```js
    'paths': {
      'src/*': ['./src/*'],
      'assets': ['./src/assets/*'],
      'constants': ['./src/constants/*'],
      'types': ['./src/types'],
      'components': '/src/components',
      'hooks': '/src/hooks',
      'layouts': '/src/layouts',
      'pages': '/src/pages',
      'services': '/src/services',
    },
```

Paths can be different and depends from projects


###  5. `Eslint` installation
```
npm install --save-dev eslint @eslint/js @stylistic/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-simple-import-sort
```
  1. `eslint`: pattern checker for JavaScript.
  2. `@eslint/js`: enables the rules recommended by the ESLint team.
  3. `@stylistic/eslint-plugin`: stylistic rules for ESLint, works for both JavaScript and TypeScript.
  4. `eslint-plugin-react-hooks`: enforces rules for React Hooks.
  5. `eslint-plugin-react-refresh`: validate that your components can safely be updated with Fast Refresh.
  6. `eslint-plugin-simple-import-sort`: ensures proper import/export syntax.

Create a `.eslint.config.js` file in the root of project and add config.

My example: see file in root folder.
.

**`eslint-plugin-simple-import-sort` sort rules**


In `eslint.config.js`

```
import simpleImportSort from 'eslint-plugin-simple-import-sort';

{
  ...
  "plugins": {
    ...
    'simple-import-sort': simpleImportSort,
  },
  "rules": {
    ...
    'simple-import-sort/imports': [
      'error',
      {
        'groups': [
          // First `react` first, `next` second, then packages starting with a character
          ['^react$', '^react-dom$'],
          // Packages starting with `@mui/*`
          ['^@mui/material', '@mui/x-data-grid', '^@mui/system', '^@mui/icons-material' ],
          // Packages starting with a character, with `@` and with `~`
          ['^[a-z]', '^@', '^~'],
          // Packages starting with `~`
          // ['^~'],
          // Imports starting with `src`
          ['src$', ],
          // Imports starting with `../`
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Imports starting with `./`
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports
          ['^.+\\.s?css$'],
          // Side effect imports
          ['^\\u0000']
        ]  
      }
    ],
    'simple-import-sort/exports': 'error',
  }
}
```


### 6. `Prettier` installation
```
npm install --save-dev prettier eslint-config-prettier
```

  1. `prettier`: code formatter.  It enforces a consistent style by parsing 
    project code and re-printing it with its own rules that take the maximum 
    line length into account, wrapping code when necessary.
  2. `eslint-config-prettier`: Disables ESLint rules that might conflict with Prettier.
  3. `eslint-plugin-react`: Adds linting rules for React.


Create a `.prettierrc` file in the root of project with required rules.

Create a `.prettierignore` file in the root of project with required rules.

Add command to `package.json` scripts:
```
"scripts": {
  ...
  "format": "prettier --write .",
},
```