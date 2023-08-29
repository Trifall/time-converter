import { create } from 'zustand';
import { TimeDescription } from '../types/time';

type CalculationState = {
	result: number | undefined;
	setResult: (result: number | undefined) => void;
	from_unit: TimeDescription | undefined;
	setFromUnit: (from_unit: TimeDescription | undefined) => void;
	to_unit: TimeDescription | undefined;
	setToUnit: (to_unit: TimeDescription | undefined) => void;
};

export const useCalculationStore = create<CalculationState>((set) => ({
	result: 0,
	setResult: (result) => set(() => ({ result })),
	from_unit: undefined,
	setFromUnit: (from_unit) => set(() => ({ from_unit })),
	to_unit: undefined,
	setToUnit: (to_unit) => set(() => ({ to_unit })),
}));
