import { defineMessage } from 'react-intl';

import { Role } from '@bezier/werewolf-core';
import {
	CollectionEntry,
	SingleCardSkill,
} from '@bezier/werewolf-client';

defineMessage({
	id: 'drunk-name',
	defaultMessage: 'Drunk',
});

defineMessage({
	id: 'drunk-background',
	defaultMessage: 'You are drunk at the bar. Why would you care who you are?',
});

defineMessage({
	id: 'drunk-instruction',
	defaultMessage: 'Choose a center card and exchange it with your own. You cannot view either card.',
});

export class Drunk extends SingleCardSkill {
}

export const drunk: CollectionEntry = {
	role: Role.Drunk,
	skills: [Drunk],
};
