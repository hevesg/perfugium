import {ObjectWithName} from '../interface/object-with-name';

export class Utils {
  static sortByName(objs: ObjectWithName[]): any[] {
    const array = objs.slice(0);
    return array.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }
}
