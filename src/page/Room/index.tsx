import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import {
	Room as RoomModel,
	TeamProfile as TeamModel,
} from '@bezier/werewolf-client';

import TeamProfile from './TeamProfile';

import './index.scss';

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

	const roles = room.getRoles();
	const teams = roles && TeamModel.fromRoles(roles);

	return (
		<>
			<h2>{intl.formatMessage(desc.roomNumber, { id: room.getId() })}</h2>
			{teams && teams.map(({ team, roles }) => (
				<TeamProfile
					team={team}
					roles={roles}
				/>
			))}
		</>
	);
}
