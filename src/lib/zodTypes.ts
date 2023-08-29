import * as z from 'zod';
import { TimeDescriptions, TimeType } from '../types/time';

const valuePattern = /^([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]$/;

const numberWithCommas = z.coerce
	.string()
	.refine((value) => value.length > 0, {
		message: 'Value is required',
	})
	.refine((value) => valuePattern.test(value), {
		message: 'Invalid number format',
	})
	.transform((value) => value.replace(/,/g, '')) // Remove commas during transformation
	.transform(Number); // Convert the cleaned string to a number

// Define a custom validation function
export function isValidTimeType(value: string): boolean {
	return Object.prototype.hasOwnProperty.call(TimeDescriptions, value as TimeType);
}

// Define a zod string type with the custom validation
export const timeTypeValidator: z.ZodType<string> = z.string().refine(isValidTimeType, {
	message: 'Invalid time type',
});

// Define the form schema using the custom number type
export const formSchema = z.object({
	from_unit: timeTypeValidator,
	to_unit: timeTypeValidator,
	// One of the two sets of fields is required
	convertValue: numberWithCommas.optional(),
	hours: numberWithCommas.optional(),
	minutes: numberWithCommas.optional(),
	seconds: numberWithCommas.optional(),
});

export type TFormSchema = z.infer<typeof formSchema>;
