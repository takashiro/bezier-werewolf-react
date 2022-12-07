import React from 'react';

import { RoomConfiguration } from '@bezier/werewolf-client';

import {
	ContextType,
	initialContext,
} from '../page/Context';
import { createLobby } from '../util/client';

import Lobby from '../page/Lobby';
import RoomCreator from '../page/RoomCreator';
import RoomLoader from '../page/RoomLoader';
import Room from '../page/Room';

export default function Main(): JSX.Element {
	const lobby = React.useMemo(createLobby, []);
	const [context, setContext] = React.useState(initialContext);

	const createRoom = React.useCallback((config: RoomConfiguration) => {
		const roles = config.getRoles();
		lobby.createRoom({ roles });
	}, []);

	React.useEffect(() => {
		function handleContextChange(e: PopStateEvent): void {
			const { state } = e;
			if (state) {
				setContext(e.state);
			} else {
				setContext({ type: ContextType.Lobby });
			}
		}
		window.addEventListener('popstate', handleContextChange);

		return () => {
			window.removeEventListener('popstate', handleContextChange);
		};
	}, []);

	switch (context.type) {
	case ContextType.RoomCreator:
		return (
			<main className="room-creator">
				<RoomCreator onSubmit={createRoom} />
			</main>
		);
	case ContextType.Room: {
		const room = lobby.getRoom();
		if (room) {
			return (
				<main className="room">
					<Room room={room} />
				</main>
			);
		}
		return (
			<main className="room-loader">
				<RoomLoader
					lobby={lobby}
					id={context.id}
				/>
			</main>
		);
	}
	case ContextType.Lobby:
	default:
		return (
			<main className="lobby">
				<Lobby />
			</main>
		);
	}
}
