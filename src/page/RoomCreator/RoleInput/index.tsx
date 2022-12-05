import React from 'react';
import { useIntl } from 'react-intl';
import { Role } from '@bezier/werewolf-core';

import NumberInput, { ChangeEvent } from '../../../base/NumberInput';
import RoleIcon from '../../../common/RoleIcon';

import RoleChangeEvent from '../RoleChangeEvent';

import './index.scss';

interface RoleInputProps {
	role: Role;
	defaultValue?: number;
	onChange?(e: RoleChangeEvent): void;
}

export default function RoleInput(props: RoleInputProps): JSX.Element {
	const intl = useIntl();
	const {
		role,
		defaultValue,
		onChange,
	} = props;

	const handleChange = (e: ChangeEvent): void => {
		onChange?.({ role, num: e.value });
	};

	const roleId = Role[role];
	const roleName = intl.formatMessage({
		id: `${roleId.toLowerCase()}-name`,
		defaultMessage: roleId,
	});

	return (
		<div className="role-input">
			<RoleIcon
				icon={Role[role]}
				name={roleName}
			/>
			<NumberInput
				defaultValue={defaultValue}
				min={0}
				max={5}
				onChange={handleChange}
			/>
		</div>
	);
}
