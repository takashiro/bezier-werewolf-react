import React from 'react';
import classNames from 'classnames';

import './index.scss';

interface RoleIconProps {
	icon: string;
	name: string;
}

export default function RoleIcon(props: RoleIconProps): JSX.Element {
	const {
		icon,
		name,
	} = props;
	const n = name.length;
	return (
		<div className="role-icon">
			<div className="image">
				<img className="background" src="style/card-bg.webp" alt="" />
				<img className="content" src={`style/role/${icon}.webp`} alt={name} />
			</div>
			<div className={classNames('name', `n${n}`)}>
				{name}
			</div>
		</div>
	);
}
