import { defineMessage } from 'react-intl';

import { Role } from '@bezier/werewolf-core';
import { CollectionEntry } from '@bezier/werewolf-client';

defineMessage({
	id: 'tanner-name',
	defaultMessage: 'Tanner',
});

export const tanner: CollectionEntry = {
	role: Role.Tanner,
};

export default tanner;
