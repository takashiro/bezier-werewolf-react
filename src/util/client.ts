import {
	Client,
	ScopedStorage,
} from '@karuta/rest-client';
import { Lobby } from '@bezier/werewolf-client';

type FetchApi = typeof window.fetch;
const fetch: FetchApi = (...args) => window.fetch(...args);
const storage = new ScopedStorage('lobby', window.localStorage);

export const client = new Client('api', fetch);

export function createLobby(): Lobby {
	const lobby = new Lobby(client);
	lobby.setStorage(storage);
	return lobby;
}
