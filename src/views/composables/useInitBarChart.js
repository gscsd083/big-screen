import * as echarts from 'echarts'
import { ref } from 'vue'

export function useInitBarChart (parkInfo) {
  // 渲染年度收入分析图表
  // 獲取原生dom元素
  const barChart = ref(null)
  const initBarChart = () => {
    // 1. 解构图表数据
    const { parkIncome } = parkInfo.value
    // 2. 准备options数据
    const barOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        // 让图表占满容器
        top: '10px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
            show: false
          },
          data: parkIncome.xMonth
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '园区年度收入',
          type: 'bar',
          barWidth: '10px',
          data: parkIncome.yIncome.map((item, index) => {
            const color =
              index % 2 === 0
                ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0.23, color: '#74c0f8' },
                    { offset: 1, color: 'rgba(116,192,248,0.00)' }
                  ])
                : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0.23, color: '#ff7152' },
                    { offset: 1, color: 'rgba(255,113,82,0.00)' }
                  ])
            return { value: item, itemStyle: { color } }
          })
        }
      ],
      textStyle: {
        color: '#B4C0CC'
      }
    }
    // 3. 渲染图表
    const myBarChart = echarts.init(barChart.value)
    myBarChart.setOption(barOptions)
  }
  return {
    barChart,
    initBarChart
  }
}
