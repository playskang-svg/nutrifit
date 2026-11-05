import * as migration_20261105_135655_initial from './20261105_135655_initial';

export const migrations = [
  {
    up: migration_20261105_135655_initial.up,
    down: migration_20261105_135655_initial.down,
    name: '20261105_135655_initial'
  },
];
