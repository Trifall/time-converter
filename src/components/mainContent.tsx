import { useCalculationStore } from '../state/calculationStore';
import ConvertForm from './convertForm';
import ResultCard from './resultCard';

const MainContent = () => {
	const { result, from_unit, to_unit, inputValue } = useCalculationStore();

	return (
		<div className='flex flex-row'>
			<ConvertForm />
			{result !== undefined && from_unit && to_unit && (
				<ResultCard inputValue={inputValue} result={result} from_unit={from_unit} to_unit={to_unit} />
			)}
		</div>
	);
};
export default MainContent;
