import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import { Role } from '@bezier/werewolf-core';

import Clickable from '../../base/Clickable';
import RoleIcon from '../RoleIcon';

import './index.scss';

export interface ChangeEvent {
	role: Role;
	selected: boolean;
}

interface RoleButtonProps {
	role: Role;
	defaultSelected?: boolean;
	onChange?(e: ChangeEvent): void;
}

export default function RoleButton(props: RoleButtonProps): JSX.Element {
	const intl = useIntl();
	const {
		role,
		defaultSelected = false,
		onChange,
	} = props;

	const [selected, setSelected] = React.useState(defaultSelected);

	function toggle(): void {
		setSelected((prev) => {
			const cur = !prev;
			onChange?.({ role, selected: cur });
			return cur;
		});
	}

	const icon = Role[role];
	const label = intl.formatMessage({
		id: `${icon.toLowerCase()}-name`,
		defaultMessage: icon,
	});
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
