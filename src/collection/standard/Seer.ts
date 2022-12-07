import { defineMessage } from 'react-intl';
import { Role } from '@bezier/werewolf-core';
import {
	CollectionEntry,
	TargetlessSkill,
} from '@bezier/werewolf-client';

defineMessage({
	id: 'seer-name',
	defaultMessage: 'Seer',
});

defineMessage({
	id: 'seer-background',
	defaultMessage: 'You are about to get asleep but found something is weird in the prophecy, something about murder.',
});

defineMessage({
	id: 'seer-instruction',
	defaultMessage: 'You can check either a role card of a player or two center cards.',
});

export class Seer extends TargetlessSkill {
}

export const seer: CollectionEntry = {
	role: Role.Seer,
	skills: [],
};
