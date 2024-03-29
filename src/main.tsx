import '@/styles/global.css';
import { ThemeProvider } from '@/styles/themeContext.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Toaster } from './components/ui/toaster.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<Toaster />
			<App />
		</ThemeProvider>
	</React.StrictMode>
);
