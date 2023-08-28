export const TimeTypes = {
	eons: 'eons',
	millennia: 'millennia',
	centuries: 'centuries',
	decades: 'decades',
	years: 'years',
	months: 'months',
	weeks: 'weeks',
	'work-weeks': 'work-weeks',
	days: 'days',
	hours: 'hours',
	minutes: 'minutes',
	seconds: 'seconds',
	milliseconds: 'milliseconds',
	microseconds: 'microseconds',
	nanoseconds: 'nanoseconds',
	'hours:minutes:seconds': 'hours:minutes:seconds',
} as const;

export type TimeTypeKey = keyof typeof TimeTypes;

export type TimeType = (typeof TimeTypes)[TimeTypeKey];

export interface TimeDescription {
	capitalized_name?: string; // Optional field for capitalized name
	description: string;
	conversion_phrase: string; // Optional field for conversion phrase
	abbreviations?: string[]; // Optional field for common abbreviations
	formatted_name?: string; // Optional field for formatted name
}

export const TimeDescriptions: Record<TimeType, TimeDescription> = {
	eons: {
		capitalized_name: 'Eons',
		description: 'An extremely long period of time.',
		conversion_phrase: 'eons',
	},
	millennia: {
		capitalized_name: 'Millennia',
		description: 'A period of one thousand years.',
		conversion_phrase: 'millennia',
	},
	centuries: {
		capitalized_name: 'Centuries',
		description: 'A period of one hundred years.',
		conversion_phrase: 'centuries',
	},
	decades: {
		capitalized_name: 'Decades',
		description: 'A period of ten years.',
		conversion_phrase: 'decades',
	},
	years: {
		capitalized_name: 'Years',
		description: 'A period of one year.',
		conversion_phrase: 'years',
	},
	months: {
		capitalized_name: 'Months',
		description: 'A period of one month.',
		conversion_phrase: 'months',
	},
	weeks: {
		capitalized_name: 'Weeks',
		description: 'A period of one week.',
		conversion_phrase: 'weeks',
	},
	days: {
		capitalized_name: 'Days',
		description: 'A period of one day.',
		conversion_phrase: 'days',
	},
	'work-weeks': {
		capitalized_name: 'Work-Weeks',
		description: 'A period of one work-week.',
		conversion_phrase: 'work-weeks',
	},
	hours: {
		capitalized_name: 'Hours',
		description: 'A period of one hour.',
		conversion_phrase: 'hours',
	},
	minutes: {
		capitalized_name: 'Minutes',
		description: 'A period of one minute.',
		conversion_phrase: 'minutes',
	},
	seconds: {
		capitalized_name: 'Seconds',
		description: 'A period of one second.',
		conversion_phrase: 'seconds',
	},
	milliseconds: {
		capitalized_name: 'Milliseconds',
		description: 'A period of one millisecond.',
		conversion_phrase: 'milliseconds',
	},
	microseconds: {
		capitalized_name: 'Microseconds',
		description: 'A period of one microsecond.',
		conversion_phrase: 'microseconds',
	},
	nanoseconds: {
		capitalized_name: 'Nanoseconds',
		description: 'A period of one nanosecond.',
		conversion_phrase: 'nanoseconds',
	},
	'hours:minutes:seconds': {
		capitalized_name: 'Hours, Minutes, and Seconds',
		description: 'Time format in hours, minutes, and seconds.',
		formatted_name: 'Hours:Minutes:Seconds',
		conversion_phrase: 'hours-minutes-seconds',
		abbreviations: ['HH:MM:SS'], // Example abbreviation
	},
};
