import { TimeDescription, TimeDescriptions } from '../types/time';

export const getTimeType = (input: string): TimeDescription | undefined => {
	return Object.values(TimeDescriptions).find((value) => value.conversion_phrase === input);
};
