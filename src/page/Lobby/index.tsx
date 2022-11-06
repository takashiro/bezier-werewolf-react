import React from 'react';
import {
	defineMessages,
	useIntl,
} from 'react-intl';

import './index.scss';

const desc = defineMessages({
	createRoom: { defaultMessage: 'Create Room' },
	roomNumber: { defaultMessage: 'Room Number' },
	enterRoom: { defaultMessage: 'Join Room' },
});

export default function Lobby(): JSX.Element {
	const intl = useIntl();
	return (
		<div className="lobby">
			<div className="creator">
				<button type="button">
					{intl.formatMessage(desc.createRoom)}
				</button>
			</div>
			<div className="entrance">
				<input
					type="number"
					placeholder={intl.formatMessage(desc.roomNumber)}
				/>
				<button type="button">
					{intl.formatMessage(desc.enterRoom)}
				</button>
			</div>
		</div>
	);
}
