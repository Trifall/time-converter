import { TimeType } from '../types/time';

// const truncateDecimals = (number: number) => {
// 	return Math[number < 0 ? 'ceil' : 'floor'](number);
// };

export const secondsToHours = (seconds: number) => {
	if (seconds === 0) return 0;
	return seconds / 3600;
};

type ConversionFactors = Record<TimeType, number>;

export const conversionFactors: ConversionFactors = {
	eons: 365 * 10 ** 9, // Assuming 365 days per year and 1 billion years per eon
	millennia: 365 * 1000, // Assuming 365 days per year and 1000 years per millennium
	centuries: 365 * 100, // Assuming 365 days per year and 100 years per century
	decades: 3650, // Assuming 365 days per year and 10 years per decade
	years: 365, // Assuming 365 days per year
	months: 30.44, // Average days per month
	weeks: 7, // 7 days per week
	'work-weeks': 5, // 5 days per work-week
	days: 1, // Base unit
	hours: 1 / 24, // 1 day = 24 hours
	minutes: 1 / (24 * 60), // 1 day = 24 * 60 minutes
	seconds: 1 / (24 * 60 * 60), // 1 day = 24 * 60 * 60 seconds
	milliseconds: 1 / (24 * 60 * 60 * 1000), // 1 day = 24 * 60 * 60 * 1000 milliseconds
	microseconds: 1 / (24 * 60 * 60 * 1000000), // 1 day = 24 * 60 * 60 * 1000000 microseconds
	nanoseconds: 1 / (24 * 60 * 60 * 1000000000), // 1 day = 24 * 60 * 60 * 1000000000 nanoseconds
	'hours:minutes:seconds': 1 / 24, // 1 day = 24 hours
};

export const convertTime = (value: number, fromUnit: TimeType, toUnit: TimeType): number | undefined => {
	// console.log(`Converting ${value} ${fromUnit} to ${toUnit}`);
	// console.log(`Conversion Factors: ${conversionFactors[fromUnit]}, ${conversionFactors[toUnit]}`);
	if (fromUnit === toUnit) {
		return value;
	}
	if (fromUnit === 'hours:minutes:seconds' && toUnit === 'hours') {
		return value;
	}
	if (fromUnit === 'hours' && toUnit === 'hours:minutes:seconds') {
		return value;
	}
	const fromFactor = conversionFactors[fromUnit];
	const toFactor = conversionFactors[toUnit];

	if (fromFactor && toFactor) {
		return (value * fromFactor) / toFactor;
	}

	console.error(`Conversion not supported from ${fromUnit} to ${toUnit}`);
	return undefined;
};
