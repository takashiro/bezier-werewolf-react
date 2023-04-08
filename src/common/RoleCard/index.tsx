import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import './index.scss';

const desc = defineMessages({
	briefRole: { defaultMessage: 'No.{seat} {role}' },
});

interface RoleCardProps {
	seat: number,
	icon: string;
	name: string;
	background: string;
	instruction: string;
}

export default function RoleCard({
	seat,
	icon,
	name,
	background,
	instruction,
}: RoleCardProps): JSX.Element {
	const intl = useIntl();
	return (
		<article className="role-card">
			<h3>{intl.formatMessage(desc.briefRole, { seat, role: name })}</h3>
			<div className="image">
				<img className="background" src="style/card-bg.webp" alt="" />
				<img className="content" src={`style/role/${icon}.webp`} alt={name} />
			</div>
			<p className="background">{background}</p>
			<p className="instruction">{instruction}</p>
		</article>
	);
}
