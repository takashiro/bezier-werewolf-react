import React from 'react';
import { useIntl } from 'react-intl';

import { Role, Team } from '@bezier/werewolf-core';
import { RoomConfiguration } from '@bezier/werewolf-client';

import FocusList from '../../base/FocusList';
import RoleButton, { ChangeEvent } from '../../common/RoleButton';

import RoleInput from './RoleInput';
import RoleChangeEvent from './RoleChangeEvent';

interface TeamSelectorProps {
	team: Team;
	roles: Role[];
	primary?: Role;
	config: RoomConfiguration;
	onChange?(e: RoleChangeEvent): void;
}

function convertChangeEvent(e: ChangeEvent): RoleChangeEvent {
	return {
		role: e.role,
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

	const handleSelectedChange = React.useCallback((e: ChangeEvent) => {
		onChange?.(convertChangeEvent(e));
	}, [onChange]);

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
							role={role}
							defaultSelected={config.getRoleNum(role) > 0}
							onChange={handleSelectedChange}
						/>
					</li>
				))}
			</FocusList>
		</section>
	);
}
