import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { TimeDescriptions, TimeType } from '../types/time';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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
function isValidTimeType(value: string): boolean {
	return Object.prototype.hasOwnProperty.call(TimeDescriptions, value as TimeType);
}

// Define a zod string type with the custom validation
const timeTypeValidator: z.ZodType<string> = z.string().refine(isValidTimeType, {
	message: 'Invalid time type',
});

// Define the form schema using the custom number type
const formSchema = z.object({
	convertValue: numberWithCommas,
	from_unit: timeTypeValidator,
	to_unit: timeTypeValidator,
});

const ConvertForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			convertValue: 0,
			from_unit: 'hours',
			to_unit: 'seconds',
		},
	});

	const handleSwapUnits = () => {
		const { from_unit, to_unit } = form.getValues();
		form.setValue('from_unit', to_unit, { shouldValidate: true });
		form.setValue('to_unit', from_unit, { shouldValidate: true });
		// console.log('error:' + form.getFieldState('from_unit').error);
	};

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log('values:', values);
	}

	// 3. Render the form.
	return (
		<div className='px-5'>
			<Card className='max-w-[400px]'>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 pt-4'>
							<FormField
								control={form.control}
								name='convertValue'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<div className='flex flex-row items-center justify-between'>
											<FormLabel className='px-2 text-xl font-bold'>Value</FormLabel>
											<FormControl className='max-w-[250px]'>
												<Input
													type='text'
													{...field}
													onBlur={() => {
														if (field.value.toString().length === 0) {
															field.onChange('0');
														}
													}}
												/>
											</FormControl>
										</div>
										<FormMessage className='self-end' />
									</FormItem>
								)}
							/>
							<Controller
								control={form.control}
								rules={{ required: true }}
								name='from_unit'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<div className='flex flex-row items-center justify-between'>
											<FormLabel className='max-w-[50px] px-2 text-xl font-bold'>From</FormLabel>
											<Select onValueChange={field.onChange} value={field.value}>
												<FormControl className='max-w-[250px]'>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{Object.entries(TimeDescriptions).map(([key, value]) => (
														<SelectItem key={key} value={key}>
															{value.formatted_name ?? value.capitalized_name ?? value.conversion_phrase}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
										<FormMessage className='self-end'>{form.formState.errors.from_unit?.message}</FormMessage>
									</FormItem>
								)}
							/>
							<Controller
								control={form.control}
								rules={{ required: true }}
								name='to_unit'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<div className='flex flex-row items-center justify-between'>
											<FormLabel className='max-w-[50px] px-2 text-xl font-bold'>To</FormLabel>
											<Select onValueChange={field.onChange} value={field.value}>
												<FormControl className='max-w-[250px]'>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{Object.entries(TimeDescriptions).map(([key, value]) => (
														<SelectItem key={key} value={key}>
															{value.formatted_name ?? value.capitalized_name ?? value.conversion_phrase}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
										<FormMessage className='self-end'>{form.formState.errors.to_unit?.message}</FormMessage>
									</FormItem>
								)}
							/>

							<Button type='submit'>Submit</Button>
							<Button className='ml-4 bg-transparent p-0 text-primary hover:bg-transparent' onClick={handleSwapUnits}>
								swap units ↺
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default ConvertForm;
