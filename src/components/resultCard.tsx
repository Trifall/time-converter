import { TimeDescription } from '../types/time';
import { Card, CardContent } from './ui/card';

type ResultCardProps = {
	result: number | undefined;
	from_unit: TimeDescription | undefined;
	to_unit: TimeDescription | undefined;
	inputValue: number | undefined;
};

const ResultCard = ({ result, from_unit, to_unit, inputValue }: ResultCardProps) => {
	return (
		<Card className='h-min w-[400px] py-2'>
			<CardContent className='py-0'>
				{result !== undefined && from_unit && to_unit && (
					<div className='result text-xl'>
						{inputValue} {from_unit.capitalized_name} <span className='text-xl'>≈</span>
						<br />{' '}
						<span className='text-2xl font-bold'>
							{result} {to_unit.capitalized_name}
						</span>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default ResultCard;
