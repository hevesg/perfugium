import {NameWithValue} from '../../../../../../perfugium/src/lib/interface/name-with-value';

export interface D6Skill extends NameWithValue<number> {
  specs?: NameWithValue<number>[];
}
