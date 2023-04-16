import React from 'react';
import classNames from 'classnames';

import './index.scss';

interface RoleIconProps {
	id?: string;
	icon: string;
	name: string;
}

export default function RoleIcon(props: RoleIconProps): JSX.Element {
	const captionId = React.useId();
	const {
		id,
		icon,
		name,
	} = props;
	const n = name.length;
	return (
		<div role="figure" id={id} className="role-icon" aria-labelledby={captionId}>
			<div className="image">
				<img className="background" src="style/card-bg.webp" alt="" />
				<img className="content" src={`style/role/${icon}.webp`} alt="" />
			</div>
			<div id={captionId} className={classNames('name', `n${n}`)}>
				{name}
			</div>
		</div>
	);
}
