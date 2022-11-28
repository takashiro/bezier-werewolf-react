import { Collection } from '@bezier/werewolf-client/collection';

import { villager } from './Villager';
import { werewolf } from './Werewolf';

const col = new Collection('standard');
col.add(villager);
col.add(werewolf);

export default col;
