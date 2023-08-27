// lint-staged.config.js
module.exports = {
  "*.{js,jsx}": [
    "eslint --cache --fix",
  ],
  "*.{ts,tsx}": [
    () => "tsc --skipLibCheck --noEmit", 
    "yarn lint",
  ],
}