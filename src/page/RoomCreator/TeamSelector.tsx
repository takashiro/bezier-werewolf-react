import React from 'react';
import { useIntl } from 'react-intl';

import { Role, Team } from '@bezier/werewolf-core';
import { RoomConfiguration } from '@bezier/werewolf-client';

import FocusList from '../../base/FocusList';
import RoleButton, { ChangeEvent } from '../../common/RoleButton';
import { formatName } from '../../util/role';

import RoleInput from './RoleInput';
import RoleChangeEvent from './RoleChangeEvent';

interface TeamSelectorProps {
	team: Team;
	roles: Role[];
	primary?: Role;
	config: RoomConfiguration;
	onChange?(e: RoleChangeEvent): void;
}

function convertChangeEvent(e: ChangeEvent<Role>): RoleChangeEvent {
	return {
		role: e.id,
		num: e.selected ? 1 : 0,
	};
}

export default function TeamSelector(props: TeamSelectorProps): JSX.Element {
	const intl = useIntl();
	const {
		team,
		primary,
		roles,
		config,
		onChange,
	} = props;

	function handleSelectedChange(e: ChangeEvent<Role>): void {
		onChange?.(convertChangeEvent(e));
	}

	return (
		<section className="team team-selector">
			<h2>{intl.formatMessage({ id: `team-${Team[team].toLowerCase()}` })}</h2>
			{primary && (
				<RoleInput role={primary} defaultValue={config.getRoleNum(primary)} onChange={onChange} />
			)}
			<FocusList
				childSelector=".role-button"
				orientation="horizontal"
				aria-orientation="horizontal"
			>
				{roles.filter((role) => role !== primary).map((role) => (
					<li key={`role-${role}`}>
						<RoleButton
							id={role}
							icon={Role[role]}
							label={formatName(intl, role)}
							defaultSelected={config.getRoleNum(role) > 0}
							onChange={handleSelectedChange}
						/>
					</li>
				))}
			</FocusList>
		</section>
	);
}
