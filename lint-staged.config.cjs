// lint-staged.config.cjs
module.exports = {
	'*.{js,jsx}': ['eslint --cache --fix'],
	'*.{ts,tsx}': [() => 'tsc --skipLibCheck --noEmit', 'yarn lint'],
};
