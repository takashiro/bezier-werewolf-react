import React from 'react';
import { createRoot } from 'react-dom/client';
import { IntlProvider } from 'react-intl';

import {
	createLocale,
	predictDefaultLanguage,
} from './util/locale';

import App from './App';

import './global.scss';

(async function main(): Promise<void> {
	const container = document.getElementById('root');
	if (!container) {
		throw new Error('The HTML template is corrupted.');
	}

	const lang = predictDefaultLanguage();
	const locale = await createLocale(lang);

	const root = createRoot(container);
	root.render(
		<IntlProvider locale={locale.language} messages={locale.messages}>
			<App />
		</IntlProvider>,
	);
}());
