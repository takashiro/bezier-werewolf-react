import { defineMessage } from 'react-intl';
import { Role } from '@bezier/werewolf-core';
import {
	CollectionEntry,
	TargetlessSkill,
} from '@bezier/werewolf-client';

defineMessage({
	id: 'insomniac-name',
	defaultMessage: 'Insomniac',
});

defineMessage({
	id: 'insomniac-background',
	defaultMessage: 'Everyone is asleep except you, struggling at night. You don\'t even know how many sleepless nights you have been through.',
});

defineMessage({
	id: 'insomniac-instruction',
	defaultMessage: 'You may check your card before daylight.',
});

export class Insomniac extends TargetlessSkill {
}

export const insomniac: CollectionEntry = {
	role: Role.Insomniac,
	skills: [Insomniac],
};
