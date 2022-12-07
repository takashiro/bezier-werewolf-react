import { defineMessage } from 'react-intl';
import { Role } from '@bezier/werewolf-core';
import {
	CollectionEntry,
	DoublePlayerSkill,
	Player,
} from '@bezier/werewolf-client';

defineMessage({
	id: 'troublemaker-name',
	defaultMessage: 'Troublemaker',
});

defineMessage({
	id: 'troublemaker-background',
	defaultMessage: 'You broke a bottle in the witch\'s house by accident. Two persons in the village are exchanged because of you.',
});

defineMessage({
	id: 'troublemaker-instruction',
	defaultMessage: 'You can exchange the role cards of two other players.',
});

export class Troublemaker extends DoublePlayerSkill {
	override filterPlayer(target: Player): boolean {
		if (target === this.owner) {
			return false;
		}
		return super.filterPlayer(target);
	}
}

export const troublemaker: CollectionEntry = {
	role: Role.Troublemaker,
	skills: [Troublemaker],
};
