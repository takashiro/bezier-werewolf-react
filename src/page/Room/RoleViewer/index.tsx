import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { Role } from '@bezier/werewolf-core';
import { DashboardPlayer } from '@bezier/werewolf-client';

import RoleCard from '../../../common/RoleCard';
import { formatName, formatBackground, formatInstruction } from '../../../util/role';

import './index.scss';

const desc = defineMessages({
	yourRole: { defaultMessage: 'Your Role' },
});

interface RoleViewerProps {
	player: DashboardPlayer;
}

export default function RoleViewer({ player }: RoleViewerProps): JSX.Element {
	const intl = useIntl();
	const [seat, setSeat] = React.useState(0);
	const [role, setRole] = React.useState(Role.Unknown);

	React.useEffect(() => {
		async function updateProfile(player: DashboardPlayer): Promise<void> {
			const profile = await player.fetchProfile();
			setSeat(profile.seat);
			setRole(profile.role);
		}

		updateProfile(player);
	}, [player]);

	return (
		<section className="role-viewer">
			<h3>{intl.formatMessage(desc.yourRole)}</h3>
			<RoleCard
				seat={seat}
				icon={Role[role]}
				name={formatName(intl, role)}
				background={formatBackground(intl, role)}
				instruction={formatInstruction(intl, role)}
			/>
		</section>
	);
}
