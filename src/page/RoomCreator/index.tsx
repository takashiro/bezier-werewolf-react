import React from 'react';
import { useIntl } from 'react-intl';

import {
	Role,
	Team,
} from '@bezier/werewolf-core';
import { TeamProfile } from '@bezier/werewolf-client';

import RoleButton from '../../common/RoleButton';

import collections from '../../collection';

import './index.scss';

function loadTeams(): TeamProfile[] {
	const roles: Role[] = [];
	for (const col of collections) {
		roles.push(...col.getRoles());
	}
	return TeamProfile.fromRoles(roles);
}

export default function RoomCreator(): JSX.Element {
	const intl = useIntl();
	const [teams] = React.useState(loadTeams);

	return (
		<div className="room-creator">
			{teams.map(({ team, roles }) => (
				<section className="team" key={`team-${team}`}>
					<h2>{intl.formatMessage({ id: `team-${Team[team].toLowerCase()}` })}</h2>
					{roles.map((role) => (
						<RoleButton
							key={`role-${role}`}
							icon={Role[role]}
							name={intl.formatMessage({
								id: `${Role[role].toLowerCase()}-name`,
								defaultMessage: Role[role],
							})}
						/>
					))}
				</section>
			))}
		</div>
	);
}
