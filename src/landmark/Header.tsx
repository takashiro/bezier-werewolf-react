import React from 'react';
import {
	defineMessages,
	useIntl,
} from 'react-intl';

import './Header.scss';

const desc = defineMessages({
	title: { defaultMessage: 'Game Assistant for One Night Ultimate Werewolf' },
});

export default function Header(): JSX.Element {
	const intl = useIntl();
	const title = intl.formatMessage(desc.title);
	return (
		<header>
			<h1>
				<img src="../style/logo.webp" alt={title} />
			</h1>
		</header>
	);
}
