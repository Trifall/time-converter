import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { convertTime } from '../lib/calculations';
import { TFormSchema, formSchema } from '../lib/zodTypes';
import { TimeDescriptions, TimeType, TimeTypes } from '../types/time';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const ConvertForm = () => {
	const form = useForm<TFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			convertValue: 0,
			from_unit: 'hours',
			to_unit: 'seconds',
			hours: undefined,
			minutes: undefined,
			seconds: undefined,
		},
	});

	const resetValues = (value: string) => {
		if (value === TimeTypes['hours:minutes:seconds']) {
			form.setValue('convertValue', undefined, { shouldValidate: true });
			form.setValue('hours', 0, { shouldValidate: true });
			form.setValue('minutes', 0, { shouldValidate: true });
			form.setValue('seconds', 0, { shouldValidate: true });
		} else {
			form.setValue('convertValue', 0, { shouldValidate: true });
			form.setValue('hours', undefined, { shouldValidate: true });
			form.setValue('minutes', undefined, { shouldValidate: true });
			form.setValue('seconds', undefined, { shouldValidate: true });
		}
	};

	const handleSwapUnits = () => {
		const { from_unit, to_unit } = form.getValues();
		if (from_unit === TimeTypes['hours:minutes:seconds'] || to_unit === TimeTypes['hours:minutes:seconds']) {
			handleFromUnitChange(to_unit);
		} else {
			form.setValue('from_unit', to_unit, { shouldValidate: true });
		}
		form.setValue('to_unit', from_unit, { shouldValidate: true });
		// console.log('error:' + form.getFieldState('from_unit').error);
		// console.log(`values: ${form.getValues()}`);
	};

	const handleFromUnitChange = (value: string) => {
		form.setValue('from_unit', value, { shouldValidate: true });
		resetValues(value);
	};

	// 2. Define a submit handler.
	function onSubmit(values: TFormSchema) {
		if (values.from_unit === TimeTypes['hours:minutes:seconds']) {
			const { hours, minutes, seconds } = values;
			if (hours === undefined || minutes === undefined || seconds === undefined) {
				return;
				//TODO: implement more error handling here (e.g. show error message)
			}
			const totalSeconds = hours * 3600 + minutes * 60 + seconds;
			convertTime(totalSeconds, values.from_unit as TimeType, values.to_unit as TimeType);
		} else {
			const { convertValue } = values;
			if (convertValue === undefined) {
				return;
			}
			convertTime(convertValue, values.from_unit as TimeType, values.to_unit as TimeType);
		}
		console.log('values:', values);
	}

	// 3. Render the form.
	return (
		<div className='px-5'>
			<Card className='max-w-[400px]'>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 pt-4'>
							{form.watch('from_unit') === TimeTypes['hours:minutes:seconds'] ? (
								<div className='flex flex-col gap-4'>
									<FormField
										control={form.control}
										name='hours'
										render={({ field }) => (
											<FormItem className='flex flex-col'>
												<div className='flex flex-row items-center justify-between'>
													<FormLabel className='px-2 text-xl font-bold'>Hours</FormLabel>
													<FormControl className='max-w-[250px]'>
														<Input
															type='text'
															{...field}
															onBlur={() => {
																if (field.value?.toString().length === 0) {
																	field.onChange('0');
																}
															}}
														/>
													</FormControl>
												</div>
												<FormMessage className='self-end'>{form.formState.errors.hours?.message}</FormMessage>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='minutes'
										render={({ field }) => (
											<FormItem className='flex flex-col'>
												<div className='flex flex-row items-center justify-between'>
													<FormLabel className='px-2 text-xl font-bold'>Minutes</FormLabel>
													<FormControl className='max-w-[250px]'>
														<Input
															type='text'
															{...field}
															onBlur={() => {
																if (field.value?.toString().length === 0) {
																	field.onChange('0');
																}
															}}
														/>
													</FormControl>
												</div>
												<FormMessage className='self-end'>{form.formState.errors.minutes?.message}</FormMessage>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='seconds'
										render={({ field }) => (
											<FormItem className='flex flex-col'>
												<div className='flex flex-row items-center justify-between'>
													<FormLabel className='px-2 text-xl font-bold'>Seconds</FormLabel>
													<FormControl className='max-w-[250px]'>
														<Input
															type='text'
															{...field}
															onBlur={() => {
																if (field.value?.toString().length === 0) {
																	field.onChange('0');
																}
															}}
														/>
													</FormControl>
												</div>
												<FormMessage className='self-end'>{form.formState.errors.seconds?.message}</FormMessage>
											</FormItem>
										)}
									/>
								</div>
							) : (
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
															if (field.value?.toString().length === 0) {
																field.onChange('0');
															}
														}}
													/>
												</FormControl>
											</div>
											<FormMessage className='self-end'>{form.formState.errors.from_unit?.message}</FormMessage>
										</FormItem>
									)}
								/>
							)}
							<Controller
								control={form.control}
								rules={{ required: true }}
								name='from_unit'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<div className='flex flex-row items-center justify-between'>
											<FormLabel className='max-w-[50px] px-2 text-xl font-bold'>From</FormLabel>
											<Select onValueChange={handleFromUnitChange} value={field.value}>
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
