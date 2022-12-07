import React from 'react';

import { RoomConfiguration } from '@bezier/werewolf-client';

import Context, {
	ContextType,
	initialContext,
} from '../page/Context';
import { createLobby } from '../util/client';

import Lobby from '../page/Lobby';
import RoomCreator from '../page/RoomCreator';

function MainContent(): JSX.Element {
	const lobby = React.useMemo(createLobby, []);
	const [context, setContext] = React.useState(initialContext);

	React.useEffect(() => {
		function handleContextChange(e: PopStateEvent): void {
			const { state } = e;
			if (state) {
				const { type, id } = e.state as Partial<Context>;
				if (type) {
					setContext({ type, id });
				}
			} else {
				setContext({ type: ContextType.Lobby });
			}
		}
		window.addEventListener('popstate', handleContextChange);

		return () => {
			window.removeEventListener('popstate', handleContextChange);
		};
	}, []);

	const createRoom = React.useCallback((config: RoomConfiguration) => {
		const roles = config.getRoles();
		lobby.createRoom({ roles });
	}, []);

	switch (context.type) {
	case ContextType.RoomCreator:
		return <RoomCreator onSubmit={createRoom} />;
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
