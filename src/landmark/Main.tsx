import React from 'react';
import Context from '../page/Context';

import Lobby from '../page/Lobby';

function MainContent(): JSX.Element {
	const [context] = React.useState(Context.Lobby);

	switch (context) {
	case Context.Lobby:
	default:
		return <Lobby />;
	}
}

export default function Main(): JSX.Element {
	return (
		<main>
			<MainContent />
		</main>
	);
}
