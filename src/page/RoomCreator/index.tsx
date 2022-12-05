import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import {
	Role,
	Team,
} from '@bezier/werewolf-core';
import {
	TeamProfile,
	RoomConfiguration,
} from '@bezier/werewolf-client';

import collections from '../../collection';

import TeamSelector from './TeamSelector';
import RoleChangeEvent from './RoleChangeEvent';

import './index.scss';
import { ContextType, go } from '../Context';
import Clickable from '../../base/Clickable';

const desc = defineMessages({
	create: { defaultMessage: 'Create' },
	cancel: { defaultMessage: 'Cancel' },
});

function loadTeams(): TeamProfile[] {
	const roles: Role[] = [];
	for (const col of collections) {
		roles.push(...col.getRoles());
	}
	return TeamProfile.fromRoles(roles);
}

const primaryRoles: Map<Team, Role> = new Map([
	[Team.Werewolf, Role.Werewolf],
	[Team.Villager, Role.Villager],
]);

export default function RoomCreator(): JSX.Element {
	const intl = useIntl();

	const config = React.useMemo(() => {
		const c = new RoomConfiguration(window.localStorage);
		if (!c.read()) {
			c.reset();
		}
		return c;
	}, []);

	const [teams] = React.useState(loadTeams);

	const handleChange = React.useCallback((e: RoleChangeEvent) => {
		config.setRoleNum(e.role, e.num);
	}, []);

	const handleSubmit = React.useCallback(() => {
		config.save();
	}, []);

	const handleCancel = React.useCallback(() => {
		go({ type: ContextType.Lobby });
	}, []);

	return (
		<div className="room-creator">
			{teams.map(({ team, roles }) => (
				<TeamSelector
					key={`team-${team}`}
					team={team}
					primary={primaryRoles.get(team)}
					roles={roles}
					config={config}
					onChange={handleChange}
				/>
			))}
			<div className="button-area">
				<Clickable
					className="button"
					onTrigger={handleCancel}
				>
					{intl.formatMessage(desc.cancel)}
				</Clickable>
				<Clickable
					className="button"
					onTrigger={handleSubmit}
				>
					{intl.formatMessage(desc.create)}
				</Clickable>
			</div>
		</div>
	);
}
