import { useCalculationStore } from '../state/calculationStore';
import ConvertForm from './convertForm';
import ResultCard from './resultCard';
import UnitCard from './unitCard';

const MainContent = () => {
	const { result, from_unit, to_unit, inputValue } = useCalculationStore();

	return (
		<div className='flex flex-col flex-wrap items-center gap-4 sm:pl-6 md:flex-row md:items-start'>
			<div className='flex flex-col flex-wrap gap-4 md:flex-row'>
				<ConvertForm />
				{result !== undefined && from_unit && to_unit && (
					<>
						<ResultCard inputValue={inputValue} result={result} from_unit={from_unit} to_unit={to_unit} />
					</>
				)}
			</div>

			{from_unit && to_unit && (
				<div className='flex flex-col flex-wrap gap-4 md:flex-row'>
					<UnitCard unit={from_unit} />
					<UnitCard unit={to_unit} />
				</div>
			)}
		</div>
	);
};
export default MainContent;
