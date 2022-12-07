import { Role } from '@bezier/werewolf-core';

import {
	CollectionEntry,
	TargetlessSkill,
} from '@bezier/werewolf-client';
import { defineMessage } from 'react-intl';

defineMessage({
	id: 'minion-name',
	defaultMessage: 'Minion',
});

defineMessage({
	id: 'minion-background',
	defaultMessage: 'You saw what the werewolves were doing at night and decided to help them. You want revenge. The village must be destroyed.',
});

defineMessage({
	id: 'minion-instruction',
	defaultMessage: 'You can see all the players who drew a werewolf card.',
});

export class Minion extends TargetlessSkill {
	protected buttonLabel = '暗中观察';
}

export const minion: CollectionEntry = {
	role: Role.Minion,
	skills: [Minion],
};
