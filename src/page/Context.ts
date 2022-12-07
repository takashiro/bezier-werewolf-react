export const enum ContextType {
	Lobby = 'lobby',
	RoomCreator = 'room-creator',
	Room = 'room',
}

export interface Context {
	type: ContextType;
	id?: number;
}

export default Context;

export function serialize(context: Context): string {
	const paths: string[] = [context.type];
	if (context.id) {
		paths.push(String(context.id));
	}
	return `#${paths.join('/')}`;
}

export function deserialize(context: string): Context {
	if (!context.startsWith('#')) {
		return { type: ContextType.Lobby };
	}

	const paths = context.substring(1).split('/');
	const type = paths[0] as ContextType ?? ContextType.Lobby;
	const id = paths[1] && Number.parseInt(paths[1], 10) || undefined;
	return {
		type,
		id,
	};
}

export function go(context: Context): void {
	window.history.pushState(context, '', serialize(context));
	window.dispatchEvent(new PopStateEvent('popstate', {
		state: context,
	}));
}

export const initialContext = deserialize(window.location.hash);
