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
          'name': '关联关系', // 关系网名称
          'keyword': {},
          'base': '人物关系'
        }
      ],
      'nodes': [// 展示的节点
        // {
        //   'name': '刘烨', // 节点名称
        //   'value': 3,
        //   'category': 0// 与关系网类别索引对应，此处只有一个关系网所以这里写0
        // },
        // {
        //   'name': '霓娜',
        //   'value': 1,
        //   'category': 0
        // },
        // {
        //   'name': '诺一',
        //   'value': 1,
        //   'category': 0
        // }
      ],
      'links': [// 节点之间连接
        // {
        //   'source': 0, // 起始节点，0表示第一个节点
        //   'target': 1 // 目标节点，1表示与索引为1的节点进行连接
        // },
        // {
        //   'source': 0,
        //   'target': 2
        // }
      ]
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
        data: ['关联关系']// 此处的数据必须和关系网类别中name相对应
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
    console.log(option);
    myChart.setOption(option);
  }


//   // 随机20个小球
//   balls = [];
//   lines = [];
//   drawBallRaf;
//   drawLineRaf;
//   ballIndex = 0;
//   lineIndex = 0;
//   canvas;
//   ctx;
//
//
//   creatBalls() {
//     for (let i = 0; i < 200; i++) {
//       this.balls.push([_.random(50, 300), _.random(50, 300)]);
//     }
//   }
//
// // 随机10个关系
//   creatLines() {
//     for (let i = 0; i < 20; i++) {
//       this.lines.push([this.balls[_.random(0, 19)], this.balls[_.random(0, 19)]]);
//     }
//   }
//
//   // 小球进入并连线
//
//   constructor  () {
//     this.canvas = <HTMLCanvasElement>document.getElementById('second-can');
//     this.ctx = this.canvas.getContext('2d');
//     this.creatBalls();
//     this.creatLines();
//   }

}


