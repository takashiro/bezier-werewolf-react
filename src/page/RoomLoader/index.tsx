import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Lobby } from '@bezier/werewolf-client';

import './index.scss';

const desc = defineMessages({
	loading: { defaultMessage: 'Loading...' },
	notFound: { defaultMessage: 'The room does not exist.' },
});

interface RoomLoaderProps {
	lobby: Lobby;
	id?: number;
}

export default function RoomLoader({
	lobby,
	id,
}: RoomLoaderProps): JSX.Element {
	const intl = useIntl();

	const [loading, setLoading] = React.useState(true);

	async function enterRoom(): Promise<void> {
		if (!id) {
			setLoading(false);
			return;
		}

		try {
			await lobby.enterRoom(id);
		} catch (error) {
			setLoading(false);
		}
	}

	React.useEffect(() => {
		// Wait until all event listeners are bound
		setTimeout(enterRoom, 0);
	}, [lobby, id]);

	return (
		<div className="main-message">
			{intl.formatMessage(loading ? desc.loading : desc.notFound)}
		</div>
	);
}
