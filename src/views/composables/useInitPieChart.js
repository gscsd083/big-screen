import * as echarts from 'echarts'
import { ref } from 'vue'

export function useInitPieChart (parkInfo) {
  // 渲染园区产业分布图表
  const pieChart = ref(null)
  const initPieChart = () => {
    const { parkIndustry } = parkInfo.value
    const pieOption = {
      color: ['#00B2FF', '#2CF2FF', '#892CFF', '#FF624D', '#FFCF54', '#86ECA2'],
      legend: {
        itemGap: 20,
        bottom: '0',
        icon: 'rect',
        itemHeight: 10, // 图例icon高度
        itemWidth: 10, // 图例icon宽度
        textStyle: {
          color: '#c6d1db'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: '园区产业分析',
          type: 'pie',
          radius: ['55%', '60%'], // 设置内圈与外圈的半径使其呈现为环形
          center: ['50%', '40%'], // 圆心位置， 用于调整整个图的位置
          tooltip: {
            trigger: 'item',
            formatter: params => {
              return `${params.seriesName}</br><div style='display:flex;justify-content: space-between;'><div>${params.marker}${params.name}</div><div>${params.percent}%</div></div>`
            }
          },
          label: {
            show: false,
            position: 'center'
          },
          data: parkIndustry
        }
      ]
    }
    const myPieChart = echarts.init(pieChart.value)
    myPieChart.setOption(pieOption)
  }
  return {
    pieChart,
    initPieChart
  }
}
