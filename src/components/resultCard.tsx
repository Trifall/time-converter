import { useCalculationStore } from '../state/calculationStore';

const ResultCard = () => {
	const { result } = useCalculationStore();

	return <div>Result: {result}</div>;
};

export default ResultCard;
