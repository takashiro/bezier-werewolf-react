import { defineMessage } from 'react-intl';

import { Role } from '@bezier/werewolf-core';
import {
	CollectionEntry,
	Player,
	SinglePlayerSkill,
} from '@bezier/werewolf-client';

defineMessage({
	id: 'robber-name',
	defaultMessage: 'Robber',
});

export class Robber extends SinglePlayerSkill {
	override filterPlayer(target: Player): boolean {
		if (target === this.owner) {
			return false;
		}
		return super.filterPlayer(target);
	}
}

export const robber: CollectionEntry = {
	role: Role.Robber,
	skills: [Robber],
};
