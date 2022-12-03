import React from 'react';

import {
	Role,
	Team,
} from '@bezier/werewolf-core';
import { TeamProfile } from '@bezier/werewolf-client';

import collections from '../../collection';
import TeamSelector from './TeamSelector';

import './index.scss';

function loadTeams(): TeamProfile[] {
	const roles: Role[] = [];
	for (const col of collections) {
		roles.push(...col.getRoles());
	}
	return TeamProfile.fromRoles(roles);
}

const basicRoles: Map<Team, Role> = new Map([
	[Team.Werewolf, Role.Werewolf],
	[Team.Villager, Role.Villager],
]);

export default function RoomCreator(): JSX.Element {
	const [teams] = React.useState(loadTeams);
	return (
		<div className="room-creator">
			{teams.map(({ team, roles }) => (
				<TeamSelector
					key={`team-${team}`}
					team={team}
					basic={basicRoles.get(team)}
					roles={roles}
				/>
			))}
		</div>
	);
}
