export const capitalizeFirstLetter = (input: string): string => {
	if (input.length === 0) {
		return input;
	}

	const chars = input.split('');
	chars[0] = chars[0].toUpperCase();
	return chars.join('');
};
