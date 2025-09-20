
# Installation guide

## Git initialization

As earlier to start to commit changes as easier will be to follow and check changes. So, create project on github: **project-name**

Then clone project from github:

```
git clone <github-project-url>
```

## Setup new Vite - project
```
npm create vite <project-name>
  ? Select a framework: > React
  ? Select a variant: > TypeScript
cd <project-directory>
npm install
```

**1. Create a .nvmrc file**

Good to know the project version of Node

```
node --version > .nvmrc
```

This will create a file named .nvmrc with this content:

```
v23.5.0
```

Having done that, any developer can just run `nvm use` in the project folder and nvm will automatically switch to the correct version of node.


**2. Install testing libraries to project**

```
npm install -D vitest
npm install -D @testing-library/react @testing-library/jest-dom jsdom
```

  1. @testing-library/react -> for component testing
  2. @testing-library/jest-dom -> for DOM assertions
  3. jsdom -> for simulating a browser environment in Node for testing purposes


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
    (properties not defined by the type/interface). So Vitest must extend Vite config
    (defined as TS interface). React has conflict in configuration file if switch 
    `config` import from `vite` to `vitest` and for this reason better to use renamed
    imports.
  Additional info about Vitest: https://vitest.dev/config/file.html


**3. Check that project have a tsconfig.json ..**

.. (or **jsconfig.json**) to be sure that LSP - Language Service Protocol (as VSCode, Sublime Text, etc.) - with allow LSP to recognize all your project files. For more details read [doc](https://code.visualstudio.com/docs/languages/jsconfig#_why-do-i-need-a-jsconfigjson-file).


**4. Relative Paths imports to project (optional)**

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


**5. `Eslint` sort rules**

```
npm install --save-dev eslint-plugin-simple-import-sort
```

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


