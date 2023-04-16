import { Role } from '@bezier/werewolf-core';
import { IntlShape } from 'react-intl';

export function formatName(intl: IntlShape, role: Role): string {
	const name = Role[role];
	const id = name.toLowerCase();
	return intl.formatMessage({
		id: `${id}-name`,
		defaultMessage: name,
	});
}

export function formatBackground(intl: IntlShape, role: Role): string {
	const id = Role[role].toLowerCase();
	return intl.formatMessage({
		id: `${id}-background`,
	});
}

export function formatInstruction(intl: IntlShape, role: Role): string {
	const id = Role[role].toLowerCase();
	return intl.formatMessage({
		id: `${id}-instruction`,
	});
}
