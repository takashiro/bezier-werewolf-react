import React from 'react';
import { useIntl } from 'react-intl';
import { Role, Team } from '@bezier/werewolf-core';
import RoleIcon from '../../common/RoleIcon';

interface TeamProfileProps {
	team: Team;
	roles: Role[];
}

export default function TeamProfile({
	team,
	roles,
}: TeamProfileProps): JSX.Element {
	const intl = useIntl();

	const teamName = Team[team];
	return (
		<section className="team">
			<h3>{intl.formatMessage({ id: `team-${teamName.toLowerCase()}`, defaultMessage: `Team ${Team[team]}` })}</h3>
			<ul>
				{roles.map((role) => (
					<li key={`role-${role}`}>
						<RoleIcon
							icon={Role[role]}
							name={intl.formatMessage({ id: `${Role[role].toLowerCase()}-name`, defaultMessage: Role[role] })}
						/>
					</li>
				))}
			</ul>
		</section>
	);
}
