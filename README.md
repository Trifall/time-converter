# Time Converter

## Overview

A time-unit website that lets you convert between different units, quickly. Has various options to speed up the user's experience, and provides facts about each unit in the conversion.

### Technologies

- Vite
- React
- Zod (Validation)
- Zustand (State Management)
- TailwindCSS (Styling)
- ShadCN UI (Styling / Components)
  - clsx and tailwind-merge (cn function)
  - Radix UI Icons
- Prettier (Formatting)
- ESLint (Linting)

### Installation


1. Install [Yarn version 3.6.3](https://yarnpkg.com/) if you haven't already
2. Clone this repo 
```
# https
https://github.com/Trifall/time-converter.git

# or ssh
git@github.com:Trifall/time-converter.git
```

3. Install dependencies
```
yarn install
```

4. Run development server
```
yarn dev
```

5. Compile build
```
yarn build
```


### TODOs

- [x] Add copy to clipboard button
- [x] Add comma checkbox for values
- [x] Change error color, make more vibrant
- [x] Add error message for invalid input
- [x] Add URL query params for input and output units
- [x] Add tooltips
