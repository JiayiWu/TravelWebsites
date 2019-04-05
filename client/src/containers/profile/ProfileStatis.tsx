import * as React from 'react'
import { Form, Input, Button, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import API from '../../utils/API'
import messageHandler from '../../utils/messageHandler'

interface StatisProps {

}

const FormItem  = Form.Item
class ProfileStatis extends React.Component<StatisProps &FormComponentProps, any> {

  componentDidMount() {
    var echarts = require('echarts')

    // 用户参与活动数量与月份折线图
    var myChart = echarts.init(document.getElementById('activityNums'));

    var data = [19, 28, 0, 21, 7];
    var xdata = ['12月', '1月', '2月', '3月', '4月'];
    var option = {
      title: { text: '用户参与活动数量' },
      grid: {
        left: 30,
        right: 50,
        top: 100,
        bottom: 30,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        // boundaryGap: false,
        data: xdata,
        triggerEvent: true,
        splitLine: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 2,
            color: 'rgba(255,255,255,.6)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#000',
          fontSize: 16,
        }
      },
      yAxis: {
        name: '活动个数',
        nameTextStyle: {
          color: '#000',
          fontSize: 16,
          textShadowOffsetY: 2
        },
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,.2)'
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 2,
            color: 'rgba(255,255,255,.6)'
          }
        },
        axisTick: {
          show: true
        },
        axisLabel: {
          color: '#000',
          fontSize: 16,
        }
      },
      series: [
        {
        data: data,
        type: 'line',
        symbol: 'circle',
        symbolSize: 12,
        color: '#FEC201',
        lineStyle: {
          color: "#03E0F2"
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#FEC201',
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        areaStyle: {
          color: 'rgba(1,98,133,0.6)'
        }
      }, {
        type: 'bar',
        animation: false,
        barWidth: 3,
        hoverAnimation: false,
        data: data,
        tooltip: {
          show: false
        },
        itemStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: '#91EAF2' // 0% 处的颜色
              }, {
                offset: 1,
                color: '#074863' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            },
            label: {
              show: false
            }
          }
        }
      }]
    }
    myChart.setOption(option)

  }
  render() {
    return (
      <div id="activityNums" style={{ width: 800, height: 400 }}></div>

    );
  }
}

export default Form.create()(ProfileStatis)