import { conversionFactors } from '../lib/calculations';
import { TimeDescription, TimeDescriptions, TimeType } from '../types/time';

export const capitalizeFirstLetter = (input: string): string => {
	if (input.length === 0) {
		return input;
	}

	const chars = input.split('');
	chars[0] = chars[0].toUpperCase();
	return chars.join('');
};

const thresholdMap: Record<TimeType, number> = {
	eons: 15,
	millennia: 12,
	centuries: 12,
	decades: 10,
	years: 10,
	months: 8,
	weeks: 8,
	'work-weeks': 8,
	days: 8,
	hours: 8,
	minutes: 8,
	seconds: 8,
	milliseconds: 8,
	microseconds: 8,
	nanoseconds: 8,
	'hours:minutes:seconds': 8,
};

export const formatResult = (
	inputValue: number | undefined,
	result: number | undefined,
	from_unit: TimeDescription,
	to_unit: TimeDescription
): string => {
	if (!inputValue) return 'N/A';
	if (!result) return 'N/A';

	let displayString = '';

	const applyRounding = (value: number, timeType: TimeType) => {
		const threshold = thresholdMap[timeType as TimeType];
		if (value === 0) return 0;
		try {
			return parseFloat(value.toFixed(threshold));
		} catch (e) {
			console.log(`Error: ${e}`);
			return 0;
		}
	};

	if (from_unit.conversion_phrase === TimeDescriptions['hours:minutes:seconds'].conversion_phrase) {
		const totalSeconds = Math.round(inputValue * 3600); // Convert to total seconds and round to avoid precision issues
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);

		let seconds;

		if (to_unit.conversion_phrase === TimeDescriptions['seconds'].conversion_phrase) {
			try {
				seconds = parseFloat((totalSeconds % 60).toFixed(2));
			} catch (e) {
				console.log(`Error: ${e}`);
				return 'Error parsing seconds';
			}
			displayString = `${hours} Hour${hours === 1 ? '' : 's'}, ${minutes} Minute${
				minutes === 1 ? '' : 's'
			}, and ${seconds} Second${seconds === 1 ? '' : 's'} ≈ ${result} ${to_unit.capitalized_name}`;
		}

		seconds = applyRounding(totalSeconds % 60, from_unit.conversion_phrase as TimeType);

		displayString =
			`${hours} Hour${hours === 1 ? '' : 's'}, ${minutes} Minute${minutes === 1 ? '' : 's'}, and ${seconds} Second${
				seconds === 1 ? '' : 's'
			}` + ` ≈ ${result} ${to_unit.capitalized_name}`;
	} else if (to_unit.conversion_phrase === TimeDescriptions['hours:minutes:seconds'].conversion_phrase) {
		const totalSecondsUnrounded = result * 3600; // Convert to total seconds and round to avoid precision issues
		let totalSeconds = Math.round(totalSecondsUnrounded); // Convert to total seconds and round to avoid precision issues

		// check if from_unit conversion factor is less than seconds
		if (conversionFactors[from_unit.conversion_phrase as TimeType] < conversionFactors['seconds']) {
			totalSeconds = applyRounding(totalSecondsUnrounded, to_unit.conversion_phrase as TimeType);
		}

		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = applyRounding(totalSeconds % 60, from_unit.conversion_phrase as TimeType);

		displayString = `${inputValue} ${from_unit.capitalized_name} ≈ ${hours} Hour${
			hours === 1 ? '' : 's'
		}, ${minutes} Minute${minutes === 1 ? '' : 's'}, and ${seconds} Second${seconds === 1 ? '' : 's'}`;
	} else {
		const roundedInput = applyRounding(inputValue, from_unit.conversion_phrase as TimeType);
		const roundedResult = applyRounding(result, to_unit.conversion_phrase as TimeType);

		displayString = `${roundedInput} ${from_unit.capitalized_name} ≈ ${roundedResult} ${to_unit.capitalized_name}`;
	}

	return displayString;
};
