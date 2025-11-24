# Installation guide

## 1. Git initialization

As earlier to start to commit changes as easier will be to follow and check changes. So, create project on github: **project-name**

Then clone project from github:

```
git clone <github-project-url>
```

## 2. Setup new `Vite` - project
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


## 2. Install testing libraries to project**

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


## 3. Check that project have a tsconfig.json..

.. (or **jsconfig.json**) to be sure that LSP - Language Service Protocol 
  (as VSCode, Sublime Text, etc.) - with allow LSP to recognize all 
  project files. 
  For more details read [doc](https://code.visualstudio.com/docs/languages/jsconfig#_why-do-i-need-a-jsconfigjson-file).


## 4. Relative Paths imports to project (optional)

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


##  5. `Eslint`

`ESLint` is an open source project that helps find and fix problems with JavaScript code.

### Install `eslint`

```
npm install --save-dev eslint @eslint/js @stylistic/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-simple-import-sort
```
  1. `eslint`: pattern checker for JavaScript.
  2. `@eslint/js`: enables the rules recommended by the ESLint team.
  3. `@stylistic/eslint-plugin`: stylistic rules for ESLint, works for both JavaScript and TypeScript.
  4. `eslint-plugin-react-hooks`: enforces rules for React Hooks.
  5. `eslint-plugin-react-refresh`: validate that your components can safely be updated with Fast Refresh.
  6. `eslint-plugin-simple-import-sort`: ensures proper import/export syntax.

### Create a `.eslint.config.js`

Create a `.eslint.config.js` file in the root of project and add config.

Example of  **`eslint-plugin-simple-import-sort` sort rules** in `eslint.config.js`:

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

### Update `package.json`

Add command to `package.json` scripts:
```
"scripts": {
  ...
  "lint": "eslint .",
},
```



## 6. `Prettier`

### Install `Prettier`
```
npm install --save-dev prettier eslint-config-prettier
```

  1. `prettier`: code formatter.  It enforces a consistent style by parsing 
    project code and re-printing it with its own rules that take the maximum 
    line length into account, wrapping code when necessary.
  2. `eslint-config-prettier`: Disables ESLint rules that might conflict with Prettier.
  3. `eslint-plugin-react`: Adds linting rules for React.

### Create a `.prettierrc` and `.prettierignore`

Create a `.prettierrc` file in the root of project and add required rules.

Create a `.prettierignore` file in the root of project and add required rules.

### Update `package.json`

Add command to `package.json` scripts:

```
"scripts": {
  ...
  "format": "prettier --write .",
},
```

**Own Note:** I do not like how Prettier format arrays and objects without free space in the 
beginning/end -> so for now I disabled it.



## 7. `Husky`

`Husky` is tool which automatically lint commit messages, code, and run tests upon committing or pushing.

### Install `husky` and `lint-staged`

```
npm install -D husky lint-staged
npx husky init
```

### Update  `.husky/pre-commit` file

```
npx lint-staged
```

### Update `package.json` file

Examples:
```
  "lint-staged": {
    "*.+(js|jsx|json|css|scss|ts|tsx)": [
      "prettier --cache --write"
    ],
    "*.{js,jsx,ts,tsx}": "eslint --fix"
  }
```
```
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ]
}
```

Lint stages [docs](https://github.com/lint-staged/lint-staged)



## 8. `Axios`



## 9. `Dotenv`

`Dotenv` is a zero-dependency module that loads environment variables from a .env file into   `process.env`.

Required in cases when need to add extra environment variable to project.

### Install `dotenv`

```
npm install dotenv
```

### Create a `.env` file with variables prefixed by `VITE_`

Create a `.env` file in the root of project directory. This file will hold project environment variables:

```
VITE_KEY='defined data / key / link'
```

**Note:** It is very important that `Vite` requires environment variables to start with `VITE_` for them to be exposed to client-side code. For `create-react-app` - environment variable starts with `REACT_APP_`.

### Ignore the `.env` file

Add `.env` to `.gitignore` file, so that it is not committed to project repository. This is important so as not to make the whole saving into a `.env` file into a fruitless effort.

```
.env
.env.local
.env.*.local
```


### (Optional) Configure dotenv in vite.config.js if custom behavior is needed

Configure `dotenv` in `Vite` project: usually, it doesn't need to explicitly import and configure `dotenv` in a `Vite` project because `Vite` automatically loads environment variables from `.env` files by default. However, if it needs to do some custom configuration, it cans be create a `vite.config.js` or `vite.config.ts` file and use `dotenv` there.

Example of how to use `dotenv` in `vite.config.ts`:

```
import { defineConfig } from 'vite';
import dotenv from 'dotenv'; // OR import { config } from 'dotenv';

// Load environment variables from .env file
dotenv.config(); // OR config();

export default defineConfig({
  // Exist Vite configuration
  define: {
     'process.env.<VITE_KEY>': JSON.stringify(process.env.VITE_KEY)
  }
});
```

### Access variables using `import.meta.env` in application code

To get access to the environment variables in JavaScript or TypeScript application code using:

```
import.meta.env.VITE_KEY
```

To check variable(s) value(s):

```
console.log(import.meta.env.VITE_KEY); // Outputs: defined data / key / link
```






