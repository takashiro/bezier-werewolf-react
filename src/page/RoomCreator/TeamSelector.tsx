import React from 'react';
import { useIntl } from 'react-intl';

import {
	Role,
	Team,

} from '@bezier/werewolf-core';

import FocusList from '../../base/FocusList';
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
			<FocusList
				childSelector=".role-button"
				orientation="horizontal"
				aria-orientation="horizontal"
			>
				{roles.filter((role) => role !== basic).map((role) => (
					<li key={`role-${role}`}>
						<RoleButton
							role={role}
						/>
					</li>
				))}
			</FocusList>
		</section>
	);
}
