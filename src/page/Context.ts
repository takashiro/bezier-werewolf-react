export const enum ContextType {
	Lobby = 'lobby',
	RoomCreator = 'room-creator',
}

interface Context {
	type: ContextType;
	id?: string;
}

export default Context;

export function go(context: Context): void {
	const params = new URLSearchParams();
	params.append('type', context.type);
	if (context.id) {
		params.append('id', context.id);
	}
	window.history.pushState(context, '', `?${params.toString()}`);
	window.dispatchEvent(new PopStateEvent('popstate', {
		state: context,
	}));
}
