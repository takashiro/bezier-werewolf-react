import React from 'react';
import { createRoot } from 'react-dom/client';
import { IntlProvider } from 'react-intl';

import App from './App';

import './global.scss';

(async function main(): Promise<void> {
	const container = document.getElementById('root');
	if (!container) {
		throw new Error('The HTML template is corrupted.');
	}

	const root = createRoot(container);
	root.render(
		<IntlProvider locale="en-US">
			<App />
		</IntlProvider>,
	);
}());
