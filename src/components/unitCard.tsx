import { OpenInNewWindowIcon } from '@radix-ui/react-icons';
import { TimeDescription } from '../types/time';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

type UnitCardProps = {
	unit?: TimeDescription;
};

const UnitCard = ({ unit }: UnitCardProps) => {
	if (!unit) return <></>;

	const handleOpenWiki = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e?.preventDefault();
		window.open(unit.wikipedia_link, '_blank noopener noreferrer');
	};

	return (
		<Card className='h-min w-[400px] border-2  py-2'>
			<CardContent className='py-0'>
				<div className='result text-md'>
					<span className='text-lg font-bold'>{unit.capitalized_name}</span>{' '}
					{unit.wikipedia_link && (
						<Button
							size={'icon'}
							className='max-h-[20px] min-h-[20px] min-w-[20px] max-w-[20px]'
							onClick={handleOpenWiki}
						>
							<OpenInNewWindowIcon />
						</Button>
					)}
					<br />
					<span className=''>{unit.description}</span>
					{unit.abbreviations && unit.abbreviations.length > 0 && (
						<>
							<br />
							<br />
							<span className='text-md font-bold'>Common Abbreviations: </span>
							<span className='text-md'>{unit.abbreviations?.join(', ')}</span>
						</>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default UnitCard;
