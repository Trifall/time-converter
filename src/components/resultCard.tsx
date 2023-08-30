import { TimeDescription } from '../types/time';
import { formatResult } from '../utils/formatting';
import { Card, CardContent } from './ui/card';

type ResultCardProps = {
	result: number | undefined;
	from_unit: TimeDescription | undefined;
	to_unit: TimeDescription | undefined;
	inputValue: number | undefined;
};

const ResultCard = ({ result, from_unit, to_unit, inputValue }: ResultCardProps) => {
	if (result === undefined || from_unit === undefined || to_unit === undefined || inputValue === undefined)
		return <></>;

	const resultValue = formatResult(inputValue, result, from_unit, to_unit);
	const resultParts = resultValue.split('≈');

	return (
		<Card className='h-min w-[400px] py-2'>
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
		</Card>
	);
};

export default ResultCard;
