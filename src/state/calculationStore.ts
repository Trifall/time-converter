import { create } from 'zustand';
import { TimeDescription, TimeDescriptions } from '../types/time';

type CalculationState = {
	inputValue: number | undefined;
	setInputValue: (inputValue: number | undefined) => void;
	result: number | undefined;
	setResult: (result: number | undefined) => void;
	from_unit: TimeDescription | undefined;
	setFromUnit: (from_unit: TimeDescription | undefined) => void;
	to_unit: TimeDescription | undefined;
	setToUnit: (to_unit: TimeDescription | undefined) => void;
	showCommas: boolean;
	setShowCommas: (showCommas: boolean) => void;
};

export const useCalculationStore = create<CalculationState>((set) => ({
	inputValue: 0,
	setInputValue: (inputValue) => set(() => ({ inputValue })),
	result: undefined,
	setResult: (result) => set(() => ({ result })),
	from_unit: TimeDescriptions['hours'],
	setFromUnit: (from_unit) => set(() => ({ from_unit })),
	to_unit: TimeDescriptions['seconds'],
	setToUnit: (to_unit) => set(() => ({ to_unit })),
	showCommas: false,
	setShowCommas: (showCommas) => set(() => ({ showCommas })),
}));
