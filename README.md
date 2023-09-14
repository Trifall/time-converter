# Time Converter

## Overview

### A website that lets you convert from one unit of time to another, quickly

<br />

### Technologies

- Vite
- React
- Zod
- Zustand
- TailwindCSS
- ShadCN UI
  - clsx and tailwind-merge (cn function)
  - Radix UI Icons
- Prettier
- ESLint

## Expanding the ESLint configuration

To enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## TODOs

- [x] Add copy to clipboard button
- [x] Add comma checkbox for values
- [x] Change error color, make more vibrant
- [x] Add error message for invalid input
- [x] Add URL query params for input and output units
- [x] Add tooltips
