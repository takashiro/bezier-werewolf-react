import React from 'react';
import classNames from 'classnames';

import Clickable from '../../base/Clickable';
import RoleIcon from '../RoleIcon';

import './index.scss';

interface RoleButtonProps {
	icon: string;
	name: string;
	defaultSelected?: boolean;
}

export default function RoleButton(props: RoleButtonProps): JSX.Element {
	const {
		icon,
		name,
		defaultSelected = false,
	} = props;

	const [selected, setSelected] = React.useState(defaultSelected);

	const toggle = React.useCallback(() => {
		setSelected((prev) => !prev);
	}, []);

	return (
		<Clickable
			className={classNames('role-button', { selected })}
			onTrigger={toggle}
		>
			<RoleIcon
				icon={icon}
				name={name}
			/>
		</Clickable>
	);
}
