import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Lobby } from '@bezier/werewolf-client';

import './index.scss';

const desc = defineMessages({
	loading: { defaultMessage: 'Loading...' },
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

	React.useEffect(() => {
		if (!id) {
			return;
		}

		setTimeout(() => {
			lobby.enterRoom(id);
		}, 0);
	}, [lobby, id]);

	return (
		<div className="main-message">
			{intl.formatMessage(desc.loading)}
		</div>
	);
}
