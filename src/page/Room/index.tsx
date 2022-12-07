import React from 'react';
import { Room as RoomModel } from '@bezier/werewolf-client';
import { defineMessages, useIntl } from 'react-intl';

const desc = defineMessages({
	roomNumber: { defaultMessage: 'Room Number: {id}' },
});

interface RoomProps {
	room: RoomModel;
}

export default function Room(props: RoomProps): JSX.Element {
	const intl = useIntl();
	const {
		room,
	} = props;

	return (
		<div className="room-creator">
			<h2>{intl.formatMessage(desc.roomNumber, { id: room.getId() })}</h2>
		</div>
	);
}
