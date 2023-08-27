import React from 'react';
import { HeaderConvert } from '../utils/headerConvert';

type HeaderProps = {
	firstUnit?: string;
	secondUnit?: string;
};

const Header = ({ firstUnit, secondUnit }: HeaderProps) => {
	return (
		<section className='body-font text-gray-600'>
			<div className='container mx-auto flex flex-col px-5 py-6 md:flex-row'>
				<div className='mb-6 flex w-full flex-col pr-0 text-center md:mb-0 md:w-auto md:pr-10 md:text-left'>
					<h1 className='title-font text-2xl font-medium text-gray-900 md:text-3xl'>
						Converting {HeaderConvert(firstUnit, secondUnit)}
					</h1>
					<h2 className='title-font mb-1 text-lg font-medium tracking-widest text-indigo-500'>Time Converter</h2>
				</div>
			</div>
		</section>
	);
};

export default Header;
