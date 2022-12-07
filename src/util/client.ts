import {
	Client,
	ScopedStorage,
} from '@karuta/rest-client';
import { Lobby, Room } from '@bezier/werewolf-client';
import { ContextType, go } from '../page/Context';

type FetchApi = typeof window.fetch;
const fetch: FetchApi = (...args) => window.fetch(...args);
const storage = new ScopedStorage('lobby', window.localStorage);

export const client = new Client('api', fetch);

function enterRoom(room: Room): void {
	go({
		type: ContextType.Room,
		id: room.getId(),
	});
}

export function createLobby(): Lobby {
	const lobby = new Lobby(client);
	lobby.on('roomChanged', enterRoom);
	lobby.setStorage(storage);
	return lobby;
}
