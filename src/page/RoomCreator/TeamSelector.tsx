import React from 'react';
import { useIntl } from 'react-intl';

import {
	Role,
	Team,

} from '@bezier/werewolf-core';

import RoleButton from '../../common/RoleButton';

import RoleInput from './RoleInput';
import ChangeEvent from './RoleChangeEvent';

interface TeamSelectorProps {
	team: Team;
	basic?: Role;
	roles: Role[];
	onChange?(e: ChangeEvent): void;
}

export default function TeamSelector(props: TeamSelectorProps): JSX.Element {
	const intl = useIntl();
	const {
		team,
		basic,
		roles,
		onChange,
	} = props;

	return (
		<section className="team-selector">
			<h2>{intl.formatMessage({ id: `team-${Team[team].toLowerCase()}` })}</h2>
			{basic && (
				<RoleInput role={basic} onChange={onChange} />
			)}
			{roles.filter((role) => role !== basic).map((role) => (
				<RoleButton
					key={`role-${role}`}
					role={role}
				/>
			))}
		</section>
	);
}
