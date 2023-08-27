import { TimeDescription, TimeDescriptions } from '../types/time';

export const getTimeType = (input: string): TimeDescription | undefined => {
	// return (TimeDescriptions as Record<string, TimeDescription>)[input] !== undefined;

	// need to check if input is a key of TimeDescriptions, or if it is a value of conversion_phrase of one of the TimeDescriptions
	const values = Object.values(TimeDescriptions);
	// console.log(`values: ${values}`);
	// console.log(`input: ${input}`);
	// return the result of the find function as well as the input key
	const result = values.find((value) => value.conversion_phrase === input);
	// console.log(`result: ${result}`);
	return result;
};
