import * as migration_20261105_135655_initial from './20261105_135655_initial';
import * as migration_20261105_144706_picks_key_kind_area from './20261105_144706_picks_key_kind_area';
import * as migration_20261105_153823_nutrient_verdict_post_featured from './20261105_153823_nutrient_verdict_post_featured';

export const migrations = [
  {
    up: migration_20261105_135655_initial.up,
    down: migration_20261105_135655_initial.down,
    name: '20261105_135655_initial',
  },
  {
    up: migration_20261105_144706_picks_key_kind_area.up,
    down: migration_20261105_144706_picks_key_kind_area.down,
    name: '20261105_144706_picks_key_kind_area',
  },
  {
    up: migration_20261105_153823_nutrient_verdict_post_featured.up,
    down: migration_20261105_153823_nutrient_verdict_post_featured.down,
    name: '20261105_153823_nutrient_verdict_post_featured'
  },
];
