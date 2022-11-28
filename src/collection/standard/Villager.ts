import { defineMessage } from 'react-intl';

import { Role } from '@bezier/werewolf-core';
import {
	CollectionEntry,
	TargetlessSkill,
} from '@bezier/werewolf-client';

defineMessage({
	id: 'villager-name',
	defaultMessage: 'Villager',
});

defineMessage({
	id: 'villager-background',
	defaultMessage: 'You went to bed at night, like always. It was a peaceful night.',
});

defineMessage({
	id: 'villager-instruction',
	defaultMessage: 'Please find the werewolves among you, vote on one of them to lynch, and your team wins.',
});

export class Villager extends TargetlessSkill {
}

export const villager: CollectionEntry = {
	role: Role.Villager,
	skills: [Villager],
};
