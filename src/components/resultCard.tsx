import { ClipboardCopyIcon } from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import { TimeDescription } from '../types/time';
import { formatResult } from '../utils/formatting';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useToast } from './ui/use-toast';

type ResultCardProps = {
	result: number | undefined;
	from_unit: TimeDescription | undefined;
	to_unit: TimeDescription | undefined;
	inputValue: number | undefined;
};

const ResultCard = ({ result, from_unit, to_unit, inputValue }: ResultCardProps) => {
	const { toast } = useToast();

	if (result === undefined || from_unit === undefined || to_unit === undefined || inputValue === undefined)
		return <></>;

	const resultValue = formatResult(inputValue, result, from_unit, to_unit);
	const resultParts = resultValue.split('≈');

	const handleCopyToClipboard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e?.preventDefault();
		if (!navigator.clipboard) return;
		if (resultParts.length < 2) return;
		navigator.clipboard.writeText(resultParts[1]);
		toast({
			description: 'The result has been copied to your clipboard.',
			variant: 'lit',
			duration: 2000,
		});
	};

	return (
		<Card className='relative h-min w-[400px] min-w-min max-w-[400px] border-4 border-blue-500 py-2'>
			<CardContent className='py-0'>
				{result !== undefined && from_unit && to_unit && (
					<div className='result text-xl'>
						{resultParts.length > 1 ? (
							<>
								{`${resultParts[0]}`}
								<span className='pl-2 font-bold'>≈</span>
								<br />
								<span className='text-2xl font-bold'>{resultParts[1]}</span>
							</>
						) : (
							<div>{resultValue}</div>
						)}
					</div>
				)}
			</CardContent>
			{result !== undefined && (
				<Tooltip.Provider>
					<Tooltip.Root delayDuration={100}>
						<Tooltip.Trigger asChild>
							<Button
								size={'icon'}
								className='absolute bottom-2 right-2 max-h-[20px] min-h-[20px] min-w-[20px] max-w-[20px]'
								onClick={handleCopyToClipboard}
							>
								<ClipboardCopyIcon color='white' />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content sideOffset={5} side={'top'} className='rounded-sm bg-gray-700 px-1  text-center'>
							<span className='text-center'>Copy Result to Clipboard</span>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			)}
		</Card>
	);
};

export default ResultCard;
