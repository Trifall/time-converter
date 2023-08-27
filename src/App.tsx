import ConvertForm from './components/convertForm';
import Footer from './components/footer';
import Header from './components/header';

function App() {
	return (
		<>
			<main>
				<section className='bg-dark'>
					<div className='layout flex min-h-screen flex-col  text-white'>
						<Header firstUnit='seconds' secondUnit='hours' />
						<ConvertForm />
						<Footer />
					</div>
				</section>
			</main>
		</>
	);
}

export default App;
