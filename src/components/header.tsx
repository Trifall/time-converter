import { useCalculationStore } from '../state/calculationStore';
import { HeaderConvert } from '../utils/headerConvert';

const Header = () => {
	const { from_unit, to_unit } = useCalculationStore();

	const headerResult = HeaderConvert(from_unit?.conversion_phrase, to_unit?.conversion_phrase);

	return (
		<section className='body-font text-gray-600'>
			<div className='container mx-auto flex flex-col px-5 py-6 '>
				<div className='mb-6 flex w-full flex-col pr-0 text-center md:mb-0 md:w-auto md:pr-10 md:text-left'>
					<h1 className='title-font text-2xl font-medium text-white md:text-3xl'>
						{!headerResult ? "It's Converting Time." : headerResult}
					</h1>
					<h2 className='title-font mb-1 text-lg font-medium tracking-widest text-indigo-500'>Time Converter</h2>
				</div>
				<div>
					<h3 className='title-font mb-1 text-center text-sm tracking-widest text-gray-300 md:text-start'>
						Enter a time value to convert, select the units, then press the Convert button!
					</h3>
				</div>
			</div>
		</section>
	);
};

export default Header;
