import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import { Role } from '@bezier/werewolf-core';

import Clickable from '../../base/Clickable';
import RoleIcon from '../RoleIcon';

import './index.scss';

interface ChangeEvent {
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

	const toggle = React.useCallback(() => {
		setSelected((prev) => {
			const cur = !prev;
			onChange?.({ role, selected: cur });
			return cur;
		});
	}, [setSelected, onChange]);

	return (
		<Clickable
			className={classNames('role-button', { selected })}
			onTrigger={toggle}
			aria-pressed={selected}
		>
			<RoleIcon
				icon={Role[role]}
				name={intl.formatMessage({
					id: `${Role[role].toLowerCase()}-name`,
					defaultMessage: Role[role],
				})}
			/>
		</Clickable>
	);
}
