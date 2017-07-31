import * as _ from 'lodash';
import {Set} from './set';
import {Http} from '@angular/http';

export class AprioriService {
  dataSource: Array<string[]> = [];
  initFrequent: Frequent[] = [];
  oneFrequentSets: Frequent[] = [];
  twoFrequentSets: Frequent[] = [];
  minSuport: number;

  constructor(minSuprot, dataSoure: Array<string[]>) {
    this.minSuport = minSuprot;
    this.dataSource = dataSoure;


// 把初始数据转换成一个最大的频繁项集
    // 遍历每一条数据
    _.forEach(dataSoure, (dataItem: string[]) => {
      this.initFrequent.push(new Frequent(new Set(dataItem)));
    });
    this.findOneFrequentSets();
    this.findTwoFrequentSets();
  }

  findOneFrequentSets() {
    const items = [];
    // 遍历每一条数据
    _.forEach(this.dataSource, (dataItems) => {
      // 扫描每一项
      _.forEach(dataItems, (item) => {
        items.push(item);
      });
    });

    _.forEach(items, (item) => {
      let bs = false;
      _.forEach(this.oneFrequentSets, (fre) => {
        if (fre.item.sourceArray[0] === item) {
          fre.showTimes++;
          bs = true;
        }
      });
      if (!bs) {
        const newFre = new Frequent(new Set(new Array(item)));
        newFre.showTimes = 1;
        newFre.itemCount = 1;
        this.oneFrequentSets.push(newFre);
      }

    });


    // 检验支持度，删除低于支持度的项集
    _.forEach(this.oneFrequentSets, (frequent) => {

      if (frequent.showTimes / this.initFrequent.length < this.minSuport) {
        frequent.isSuport = false;
      } else {
        frequent.isSuport = true;
      }
    });
    const newFre = _.filter(this.oneFrequentSets, (fre) => {
      // console.log(fre);
      return fre.isSuport === true;
    });

    this.oneFrequentSets = newFre;
  }

  findTwoFrequentSets() {
    // 构造出所有的二个频繁项集
    for (let i = 0; i < this.oneFrequentSets.length; i++) {
      for (let k = i + 1; k < this.oneFrequentSets.length; k++) {
        const array = [];
        array.push(this.oneFrequentSets[i].item.sourceArray[0]);
        array.push(this.oneFrequentSets[k].item.sourceArray[0]);
        const fre = new Frequent(new Set(array));
        fre.itemCount = 2;
        fre.showTimes = 0;
        this.twoFrequentSets.push(fre);
      }
    }
    console.log(this.twoFrequentSets);
    _.forEach(this.initFrequent, (ifre) => {
      _.forEach(this.twoFrequentSets, (tfre) => {
        if (ifre.contains(tfre)) {
          tfre.showTimes++;
        }
      });
    });
    // 剔除小于支持度的数据
    _.forEach(this.twoFrequentSets, (fre) => {
      if (fre.showTimes / this.initFrequent.length < this.minSuport) {
        fre.isSuport = false;
      } else {
        fre.isSuport = true;
      }
    });

    const newFre = _.filter(this.twoFrequentSets, (fre) => {
      return fre.isSuport === true;
    });
    this.twoFrequentSets = newFre;
  }


}

class Frequent {
  item: Set;
  // 频繁项集有几个元素
  itemCount: number;
  // 該頻繁项集的频度
  showTimes: number;
  isSuport = false;

  constructor(item: Set) {
    this.item = item;
  }

  // equels(compareFrequent) {
  //   if (this.item.equal(compareFrequent.item)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  contains(comparedFrequent) {
    if (this.item.contains(comparedFrequent.item)) {
      return true;
    } else {
      return false;
    }
  }
}
