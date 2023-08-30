import { useCalculationStore } from '../state/calculationStore';
import ConvertForm from './convertForm';
import ResultCard from './resultCard';

const MainContent = () => {
	const { result, from_unit, to_unit, inputValue } = useCalculationStore();

	return (
		<div className='flex flex-col gap-4 md:flex-row'>
			<ConvertForm />
			{result !== undefined && from_unit && to_unit && (
				<div className='px-5'>
					<ResultCard inputValue={inputValue} result={result} from_unit={from_unit} to_unit={to_unit} />
				</div>
			)}
		</div>
	);
};
export default MainContent;
