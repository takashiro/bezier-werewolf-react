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

import Clickable from '../../base/Clickable';
import collections from '../../collection';
import { ContextType, go } from '../Context';

import TeamSelector from './TeamSelector';
import RoleChangeEvent from './RoleChangeEvent';

import './index.scss';

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

interface RoomCreatorProps {
	onSubmit?(config: RoomConfiguration): void;
}

export default function RoomCreator({ onSubmit }: RoomCreatorProps): JSX.Element {
	const intl = useIntl();

	const config = React.useMemo(() => {
		const c = new RoomConfiguration(window.localStorage);
		if (!c.read()) {
			c.reset();
		}
		return c;
	}, []);

	const [teams] = React.useState(loadTeams);

	function handleChange(e: RoleChangeEvent): void {
		config.setRoleNum(e.role, e.num);
	}

	async function handleSubmit(): Promise<void> {
		config.save();
		onSubmit?.(config);
	}

	function handleCancel(): void {
		go({ type: ContextType.Lobby });
	}

	return (
		<>
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
		</>
	);
}
