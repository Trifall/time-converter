import { getTimeType } from '@/utils/time';
import { capitalizeFirstLetter } from './formatting';

export const HeaderConvert = (firstUnit?: string, secondUnit?: string) => {
	if (!firstUnit || !secondUnit) return 'nothing';

	const _firstUnit = getTimeType(firstUnit.toLowerCase());
	const _secondUnit = getTimeType(secondUnit.toLowerCase());
	if (!_firstUnit || !_secondUnit) return 'nothing';

	const formattedFirstUnit = capitalizeFirstLetter(_firstUnit.capitalized_name ?? firstUnit);
	const formattedSecondUnit = capitalizeFirstLetter(_secondUnit.capitalized_name ?? secondUnit);

	return `${formattedFirstUnit} to ${formattedSecondUnit}`;
};
