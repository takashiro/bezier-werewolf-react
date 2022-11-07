import React from 'react';
import Context, { ContextType } from '../page/Context';

import Lobby from '../page/Lobby';
import RoomCreator from '../page/RoomCreator';

const params = new URLSearchParams(window.location.search);
const type = params.get('type');

function MainContent(): JSX.Element {
	const [contextType, setContextType] = React.useState(type || ContextType.Lobby);
	React.useEffect(() => {
		function handleContextChange(e: PopStateEvent): void {
			const { state } = e;
			if (state) {
				const { type } = e.state as Partial<Context>;
				if (type) {
					setContextType(type);
				}
			} else {
				setContextType(ContextType.Lobby);
			}
		}
		window.addEventListener('popstate', handleContextChange);
		return () => {
			window.removeEventListener('popstate', handleContextChange);
		};
	}, []);

	switch (contextType) {
	case ContextType.RoomCreator:
		return <RoomCreator />;
	case ContextType.Lobby:
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
