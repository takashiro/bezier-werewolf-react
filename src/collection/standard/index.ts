import { Collection } from '@bezier/werewolf-client/collection';

import { drunk } from './Drunk';
import { villager } from './Villager';
import { werewolf } from './Werewolf';

const col = new Collection('standard');
col.add(drunk);
col.add(villager);
col.add(werewolf);

export default col;
