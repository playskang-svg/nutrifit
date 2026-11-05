import * as migration_20261105_135655_initial from './20261105_135655_initial';
import * as migration_20261105_144706_picks_key_kind_area from './20261105_144706_picks_key_kind_area';

export const migrations = [
  {
    up: migration_20261105_135655_initial.up,
    down: migration_20261105_135655_initial.down,
    name: '20261105_135655_initial',
  },
  {
    up: migration_20261105_144706_picks_key_kind_area.up,
    down: migration_20261105_144706_picks_key_kind_area.down,
    name: '20261105_144706_picks_key_kind_area'
  },
];
