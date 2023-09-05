import { Checkbox } from '@/components/ui/checkbox';

type CheckboxWithTextProps = {
	id: string;
	label: string;
	description?: string;
	changeFunction?: (checked: boolean) => void;
};

export const CheckboxWithText = ({ id, label, description, changeFunction }: CheckboxWithTextProps) => {
	return (
		<div className='items-top flex space-x-2'>
			<Checkbox id={id} onCheckedChange={changeFunction} />
			<div className='grid gap-1.5 leading-none'>
				{label && (
					<label
						htmlFor={id}
						className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
					>
						{label}
					</label>
				)}
				{description && (
					<p className='text-sm text-muted-foreground'>You agree to our Terms of Service and Privacy Policy.</p>
				)}
			</div>
		</div>
	);
};
