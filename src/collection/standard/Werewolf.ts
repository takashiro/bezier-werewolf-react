import { defineMessage } from 'react-intl';

import { Role } from '@bezier/werewolf-core';
import {
	CollectionEntry,
	TargetlessSkill,
} from '@bezier/werewolf-client';

defineMessage({
	id: 'werewolf-name',
	defaultMessage: 'Werewolf',
});

defineMessage({
	id: 'werewolf-background',
	defaultMessage: 'Night falls. The werewolves were about to attack but found something unusual in the village. They hurried to transform back and waited for daylight.',
});

defineMessage({
	id: 'werewolf-instruction',
	defaultMessage: 'You may see other werewolves at night.',
});

export class Werewolf extends TargetlessSkill {
}

export const werewolf: CollectionEntry = {
	role: Role.Werewolf,
	skills: [Werewolf],
};
