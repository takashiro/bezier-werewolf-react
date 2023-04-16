import React from 'react';
import classNames from 'classnames';

import Clickable from '../../base/Clickable';
import RoleIcon from '../RoleIcon';

import './index.scss';

export interface ChangeEvent<T> {
	id: T;
	selected: boolean;
}

interface RoleButtonProps<T> {
	id: T;
	icon: string;
	label: string;
	defaultSelected?: boolean;
	onChange?(e: ChangeEvent<T>): void;
}

export default function RoleButton<T>(props: RoleButtonProps<T>): JSX.Element {
	const {
		id,
		icon,
		label,
		defaultSelected = false,
		onChange,
	} = props;

	const [selected, setSelected] = React.useState(defaultSelected);

	function toggle(): void {
		setSelected((prev) => {
			const cur = !prev;
			onChange?.({ id, selected: cur });
			return cur;
		});
	}

	return (
		<Clickable
			className={classNames('role-button', { selected })}
			onTrigger={toggle}
			aria-pressed={selected}
			aria-label={label}
		>
			<RoleIcon
				icon={icon}
				name={label}
			/>
		</Clickable>
	);
}
