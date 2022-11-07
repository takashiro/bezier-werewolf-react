import React from 'react';

import './index.scss';

interface RoleCardProps {
	seat: number,
	icon: string;
	name: string;
	background: string;
	description: string;
}

export default function RoleCard({
	seat,
	icon,
	name,
	background,
	description,
}: RoleCardProps): JSX.Element {
	return (
		<article className="role-card">
			<h3>{`${seat}号位 ${name}`}</h3>
			<div className="image">
				<img className="background" src="style/card-bg.webp" alt="" />
				<img className="content" src={`style/role/${icon}.webp`} alt={name} />
			</div>
			<p className="background">{background}</p>
			<p className="description">{description}</p>
		</article>
	);
}
