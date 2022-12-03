import React from 'react';
import { useIntl } from 'react-intl';
import { Role } from '@bezier/werewolf-core';

import NumberInput from '../../../base/NumberInput';
import RoleIcon from '../../../common/RoleIcon';

import ChangeEvent from '../RoleChangeEvent';

import './index.scss';

interface RoleInputProps {
	role: Role;
	defaultValue?: number;
	onChange?(e: ChangeEvent): void;
}

export default function RoleInput(props: RoleInputProps): JSX.Element {
	const intl = useIntl();
	const {
		role,
		defaultValue,
		onChange,
	} = props;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const num = Number.parseInt(e.currentTarget.value, 10);
		onChange?.({ role, num });
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
				minValue={0}
				maxValue={5}
				onChange={handleChange}
			/>
		</div>
	);
}
