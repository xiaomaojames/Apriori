import * as _ from 'lodash';
import * as echarts from 'echarts';
import {AprioriService} from './apriori.service';

export class DrawBalls {
  constructor(ap: AprioriService) {
    const myChart = echarts.init(document.getElementById('second-can'));
    myChart.showLoading();
    const webkitDep = {
      'type': 'force',
      'categories': [// 关系网类别，可以写多组
        {
          'name': 'Association', // 关系网名称
          'keyword': {},
          'base': '人物关系'
        }
      ],
      'nodes': [],
      'links': []
    };
    _.each(ap.oneFrequentSets, (fre) => {
      const node: any = {};
      node.name = fre.item.sourceArray[0];
      node.value = fre.showTimes;
      node.category = 0;
      node.symbolSize = fre.showTimes / ap.initFrequent.length * 20;
      webkitDep.nodes.push(node);
    });
    _.each(ap.twoFrequentSets, (fre) => {
      const link: any = {};
      link.source = fre.item.sourceArray[0];
      link.target = fre.item.sourceArray[1];
      link.value = (1 - fre.showTimes / ap.initFrequent.length) * 150;
      webkitDep.links.push(link);

    });
    myChart.hideLoading();
    const option = {
      legend: {
        data: ['Association']// 此处的数据必须和关系网类别中name相对应
      },
      textStyle: {
        color: '#466e8e'
      },
      series: [{
        type: 'graph',
        layout: 'force',
        animation: false,
        label: {
          normal: {
            show: true,
            position: 'right'
          }
        },
        draggable: true,
        data: webkitDep.nodes,
        categories: webkitDep.categories,
        force: {
          edgeLength: 105, // 连线的长度
          repulsion: 100  // 子节点之间的间距
        },
        edges: webkitDep.links
      }]
    };

    myChart.setOption(option);
  }
}


