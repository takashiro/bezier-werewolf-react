import { Collection } from '@bezier/werewolf-client/collection';

import { drunk } from './Drunk';
import { hunter } from './Hunter';
import { insomniac } from './Insomniac';
import { minion } from './Minion';
import { robber } from './Robber';
import { seer } from './Seer';
import { troublemaker } from './Troublemaker';
import { villager } from './Villager';
import { werewolf } from './Werewolf';

const col = new Collection('standard');
col.add(drunk);
col.add(hunter);
col.add(insomniac);
col.add(minion);
col.add(robber);
col.add(seer);
col.add(troublemaker);
col.add(villager);
col.add(werewolf);

export default col;
