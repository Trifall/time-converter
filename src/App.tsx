import Footer from './components/footer';
import Header from './components/header';
import MainContent from './components/mainContent';

function App() {
	return (
		<>
			<main>
				<section className='bg-dark'>
					<div className='layout flex min-h-screen flex-col  text-white'>
						<Header />
						<MainContent />
						<Footer />
					</div>
				</section>
			</main>
		</>
	);
}

export default App;
