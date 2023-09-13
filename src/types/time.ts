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
	wikipedia_link?: string; // Optional field for wikipedia page
}

export const TimeDescriptions: Record<TimeType, TimeDescription> = {
	eons: {
		capitalized_name: 'Eons',
		description:
			'An eon is an extremely long period of time, often used in geological and cosmological contexts. It encompasses billions of years and is a fundamental unit for understanding the evolution of the universe and the Earth.',
		conversion_phrase: 'eons',
		abbreviations: ['e'],
		wikipedia_link: 'https://en.wikipedia.org/wiki/Eon_(geology)',
	},
	millennia: {
		capitalized_name: 'Millennia',
		description:
			'A millennia represents one thousand years. It is a significant time unit used to discuss historical eras, cultural shifts, and long-term developments in human civilization.',
		conversion_phrase: 'millennia',
		abbreviations: ['ka', 'ky'],
		wikipedia_link: 'https://en.wikipedia.org/wiki/Millennium',
	},
	centuries: {
		capitalized_name: 'Centuries',
		description:
			'A century corresponds to one hundred years. It is often used to categorize different periods in history, assess societal changes, and analyze the impact of time on various aspects of human existence.',
		conversion_phrase: 'centuries',
		abbreviations: ['c'],
		wikipedia_link: 'https://en.wikipedia.org/wiki/Century',
	},
	decades: {
		capitalized_name: 'Decades',
		description:
			'A decade consists of ten years. It is frequently employed to examine trends, cultural shifts, and advancements over relatively short periods of time.',
		conversion_phrase: 'decades',
		abbreviations: ['d'],
		wikipedia_link: 'https://en.wikipedia.org/wiki/Decade',
	},
	years: {
		capitalized_name: 'Years',
		description:
			'In the Gregorian calendar, a year has on average 365.2425 days. It is based on the amount of time it takes for the Earth to rotate around the sun, and it serves as a fundamental measure for tracking long-term changes, historical events, and personal milestones.',
		conversion_phrase: 'years',
		abbreviations: ['y', 'yr'],
		wikipedia_link: 'https://en.wikipedia.org/wiki/Year',
	},
	months: {
		capitalized_name: 'Months',
		description:
			'A month is 1/12th of a year. In the Gregorian calendar, an average month has exactly 30.436875 days. It was originally based on the time it takes for the moon to rotate the Earth, making it a key unit for tracking lunar and calendar-based events.',
		conversion_phrase: 'months',
		abbreviations: ['mo', 'mth'],
		wikipedia_link: 'https://en.wikipedia.org/wiki/Month',
	},
	weeks: {
		capitalized_name: 'Weeks',
		description:
			'A week is a period of 7 days. It serves as a convenient time unit for organizing schedules, coordinating events, and planning activities that recur on a regular basis.',
		conversion_phrase: 'weeks',
		abbreviations: ['wk', 'w'],
		wikipedia_link: 'https://en.wikipedia.org/wiki/Week',
	},
	'work-weeks': {
		capitalized_name: 'Work-Weeks',
		description:
			'A work-week typically consists of five business days, often Monday to Friday. It is a common unit for scheduling and employment-related calculations.',
		conversion_phrase: 'work-weeks',
		abbreviations: ['ww', 'wk'],
		wikipedia_link: 'https://en.wikipedia.org/wiki/Workweek_and_weekend',
	},
	days: {
		capitalized_name: 'Days',
		description:
			'Approximately 23.9345 hours, a day is defined as the time it takes for the Earth to complete one rotation on its axis. It is a fundamental unit of time measurement and is essential for various daily activities and astronomical observations.',
		conversion_phrase: 'days',
		abbreviations: ['d'],
		wikipedia_link: 'https://en.wikipedia.org/wiki/Day',
	},
	hours: {
		capitalized_name: 'Hours',
		description:
			'An hour is divided into 60 minutes and is used to measure relatively short durations. It plays a crucial role in scheduling, time management, and various scientific and practical applications.',
		conversion_phrase: 'hours',
		abbreviations: ['h', 'hr'],
		wikipedia_link: 'https://en.wikipedia.org/wiki/Hour',
	},
	'hours:minutes:seconds': {
		capitalized_name: 'Hours, Minutes, and Seconds',
		description:
			'The combination of hours, minutes, and seconds is a common way to express time in a digital format. It is widely used for tracking durations and time intervals in various contexts.',
		formatted_name: 'Hours:Minutes:Seconds',
		conversion_phrase: 'hours-minutes-seconds',
		abbreviations: ['HH:MM:SS'],
		wikipedia_link: 'https://en.wikipedia.org/wiki/ISO_8601#Times',
	},
	minutes: {
		capitalized_name: 'Minutes',
		description:
			'A minute is a unit of time equal to 60 seconds. It provides a practical measure for short durations and is commonly used to track the passage of time in everyday activities.',
		conversion_phrase: 'minutes',
		abbreviations: ['min', 'm'],
		wikipedia_link: 'https://en.wikipedia.org/wiki/Minute',
	},
	seconds: {
		capitalized_name: 'Seconds',
		description:
			'A second is the base unit of time in the International System of Units (SI). It is defined as the duration of 9,192,631,770 periods of the radiation corresponding to the transition between two hyperfine levels of the ground state of the cesium-133 atom.',
		conversion_phrase: 'seconds',
		abbreviations: ['s', 'sec'],
		wikipedia_link: 'https://en.wikipedia.org/wiki/Second',
	},
	milliseconds: {
		capitalized_name: 'Milliseconds',
		description:
			'A millisecond is one thousandth of a second. It is commonly used in contexts that require precise timing, such as scientific experiments, engineering, and digital technologies.',
		conversion_phrase: 'milliseconds',
		abbreviations: ['ms'],
		wikipedia_link: 'https://en.wikipedia.org/wiki/Millisecond',
	},
	microseconds: {
		capitalized_name: 'Microseconds',
		description:
			'A microsecond is one millionth of a second. This incredibly small unit of time is crucial in fields that require high-speed measurement and precision, such as electronics, telecommunications, and scientific research.',
		conversion_phrase: 'microseconds',
		abbreviations: ['µs'],
		wikipedia_link: 'https://en.wikipedia.org/wiki/Microsecond',
	},
	nanoseconds: {
		capitalized_name: 'Nanoseconds',
		description:
			'A nanosecond is one billionth of a second. It is used to describe incredibly fast processes, such as the interactions of particles at the atomic and subatomic levels.',
		conversion_phrase: 'nanoseconds',
		abbreviations: ['ns'],
		wikipedia_link: 'https://en.wikipedia.org/wiki/Nanosecond',
	},
};
