import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import {
	DashboardPlayer,
	Room as RoomModel,
	TeamProfile as TeamModel,
} from '@bezier/werewolf-client';

import TeamProfile from './TeamProfile';
import RoleViewer from './RoleViewer';

import './index.scss';
import SeatForm from './SeatForm';

const desc = defineMessages({
	roomNumber: { defaultMessage: 'Room Number: {id}' },
});

interface RoomProps {
	room: RoomModel;
}

export default function Room({ room }: RoomProps): JSX.Element {
	const intl = useIntl();
	const roles = room.getRoles();
	const teams = React.useMemo(() => roles && TeamModel.fromRoles(roles), [roles]);

	const [player, setPlayer] = React.useState<DashboardPlayer | undefined>(() => {
		let seat: number | undefined;
		try {
			seat = room.getDashboardSeat();
		} catch (error) {
			return;
		}
		if (seat) {
			return room.createPlayer(seat);
		}
	});

	return (
		<>
			<h2>{intl.formatMessage(desc.roomNumber, { id: room.getId() })}</h2>
			{teams && teams.map(({ team, roles }) => (
				<TeamProfile
					key={`team-${team}`}
					team={team}
					roles={roles}
				/>
			))}
			{player ? <RoleViewer player={player} /> : <SeatForm room={room} onSelect={setPlayer} />}
		</>
	);
}
