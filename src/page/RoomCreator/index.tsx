import React from 'react';
import { useIntl } from 'react-intl';

import Role from '@bezier/werewolf-core/Role';
import Team from '@bezier/werewolf-client/game/TeamProfile';

import RoleButton from '../../common/RoleButton';

import collections from '../../collection';

import './index.scss';

function loadTeams(): Team[] {
	const roles: Role[] = [];
	for (const col of collections) {
		roles.push(...col.getRoles());
	}
	return Team.fromRoles(roles);
}

export default function RoomCreator(): JSX.Element {
	const intl = useIntl();
	const [teams] = React.useState(loadTeams);

	return (
		<div className="room-creator">
			{teams.map((team) => (
				<div className="team" key={`team-${team.team}`}>
					{team.roles.map((role) => (
						<RoleButton
							key={`role-${role}`}
							icon={Role[role]}
							name={intl.formatMessage({
								id: `${Role[role].toLowerCase()}-name`,
								defaultMessage: Role[role],
							})}
						/>
					))}
				</div>
			))}
		</div>
	);
}
