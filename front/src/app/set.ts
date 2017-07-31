import * as _ from 'lodash';

export class Set {
  sourceArray;

  constructor(source: string[]) {
    this.sourceArray = source;
  }

  // equal(comparedSet: Set) {
  //   _.forEach(this.sourceArray, (sItem) => {
  //     _.forEach(sItem, function (cItem) {
  //       if (cItem !== sItem) {
  //         return false;
  //       }
  //     });
  //   });
  //   return true;
  // }

  push(newValue: string) {
    this.sourceArray.push(newValue);
  }

  contains(comparedSet): boolean {
    for (let i = 0; i < comparedSet.sourceArray.length; i++) {
      if (!_.includes(this.sourceArray, comparedSet.sourceArray[i])) {
        return false;
      }
    }
    return true;
  }
}
