import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { convertTime } from '../lib/calculations';
import { TFormSchema, formSchema } from '../lib/zodTypes';
import { useCalculationStore } from '../state/calculationStore';
import { TimeDescriptions, TimeType, TimeTypes } from '../types/time';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { CheckboxWithText } from './ui/checkboxWithText';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const ConvertForm = () => {
	const { setInputValue, setResult, setFromUnit, setToUnit, setShowCommas, from_unit, to_unit } = useCalculationStore();

	const form = useForm<TFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			convertValue: 0,
			from_unit: from_unit?.formatted_name ?? from_unit?.conversion_phrase ?? 'hours',
			to_unit: to_unit?.formatted_name ?? to_unit?.conversion_phrase ?? 'seconds',
			hours: undefined,
			minutes: undefined,
			seconds: undefined,
		},
		mode: 'onChange',
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

	const handleSwapUnits = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e?.preventDefault();
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

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const from = urlParams.get('from');
		const to = urlParams.get('to');

		if (from && to) {
			// Check if URL params are different from current state
			if (from !== from_unit?.conversion_phrase || to !== to_unit?.conversion_phrase) {
				if (from === 'hours-minutes-seconds') {
					setFromUnit(TimeDescriptions['hours:minutes:seconds']);
					handleFromUnitChange('hours:minutes:seconds');
				}
				if (to === 'hours-minutes-seconds') {
					setToUnit(TimeDescriptions['hours:minutes:seconds']);
					handleToUnitChange('hours:minutes:seconds');
				}

				if (TimeTypes[from as TimeType]) {
					setFromUnit(TimeDescriptions[from as TimeType]);
					handleFromUnitChange(from);
				}
				if (TimeTypes[to as TimeType]) {
					setToUnit(TimeDescriptions[to as TimeType]);
					handleToUnitChange(to);
				}

				// Update URL params if necessary
				if (from !== from_unit?.conversion_phrase) {
					urlParams.set('from', from_unit?.conversion_phrase ?? 'hours');
				}
				if (to !== to_unit?.conversion_phrase) {
					urlParams.set('to', to_unit?.conversion_phrase ?? 'seconds');
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// Update the browser's URL
		window.history.pushState(
			{},
			'',
			`${window.location.pathname}?from=${from_unit?.conversion_phrase}&to=${to_unit?.conversion_phrase}`
		);
	}, [from_unit, to_unit]);

	const handleFromUnitChange = (value: string) => {
		form.setValue('from_unit', value, { shouldValidate: true });
		if (value === TimeTypes['hours:minutes:seconds']) resetValues(value);
	};

	const handleToUnitChange = (value: string) => {
		form.setValue('to_unit', value, { shouldValidate: true });
	};

	// 2. Define a submit handler.
	function onSubmit(values: TFormSchema) {
		// console.log('Submit Values:', values);

		let inputValue;
		let result;
		if (values.from_unit === TimeTypes['hours:minutes:seconds']) {
			const { hours, minutes, seconds } = values;
			if (hours === undefined || minutes === undefined || seconds === undefined) {
				return;
				//TODO: implement more error handling here (e.g. show error message)
			}
			inputValue = hours + minutes / 60 + seconds / 3600;
			result = convertTime(inputValue, values.from_unit as TimeType, values.to_unit as TimeType);
		} else {
			const { convertValue } = values;
			if (convertValue === undefined) {
				return;
			}
			inputValue = convertValue;
			result = convertTime(convertValue, values.from_unit as TimeType, values.to_unit as TimeType);
		}

		if (inputValue === undefined) {
			return;
		}

		const FromUnitDescription = TimeDescriptions[values.from_unit as TimeType];
		const ToUnitDescription = TimeDescriptions[values.to_unit as TimeType];

		setFromUnit(FromUnitDescription);
		setToUnit(ToUnitDescription);

		setResult(result);
		setInputValue(inputValue);
	}

	// 3. Render the form.
	return (
		<Card className='w-[400px] min-w-[400px] max-w-[400px]'>
			<CardContent className='relative'>
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
												<FormControl className='w-[250px]'>
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
												<FormControl className='w-[250px]'>
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
												<FormControl className='w-[250px]'>
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
										<FormLabel className='w-[50px] px-2 text-xl font-bold'>From</FormLabel>
										<Select onValueChange={handleFromUnitChange} value={field.value}>
											<FormControl className='w-[250px]'>
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
										<FormLabel className='w-[50px] px-2 text-xl font-bold'>To</FormLabel>
										<Select onValueChange={handleToUnitChange} value={field.value}>
											<FormControl className='w-[250px]'>
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

						<div className='flex flex-row'>
							<Button type='submit' className='text-white'>
								Convert
							</Button>
							<Button className='ml-4 bg-transparent p-0 text-primary hover:bg-transparent' onClick={handleSwapUnits}>
								swap units ↺
							</Button>
							<div className='flex flex-grow items-center justify-end'>
								<CheckboxWithText
									id='UseCommasCheckbox'
									label='Display commas?'
									changeFunction={(checked) => {
										// console.log('clicked:', checked);
										setShowCommas(checked);
									}}
								/>
							</div>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default ConvertForm;
