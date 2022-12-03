import { defineMessage } from 'react-intl';

import { Role } from '@bezier/werewolf-core';
import { CollectionEntry } from '@bezier/werewolf-client';

defineMessage({
	id: 'hunter-name',
	defaultMessage: 'Hunter',
});

defineMessage({
	id: 'hunter-background',
	defaultMessage: 'You are a hunter who protects the village with your gun.',
});

defineMessage({
	id: 'hunter-instruction',
	defaultMessage: 'When you are lynched, all those who voted you dies. If any one of them is on Team Werewolf, Team Villager wins.',
});

// eslint-disable-next-line import/prefer-default-export
export const hunter: CollectionEntry = {
	role: Role.Hunter,
};
