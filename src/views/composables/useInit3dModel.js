import { ref } from 'vue'
import { Application } from '@splinetool/runtime'
import { getParkInfoAPI } from '@/apis/index'


export function useInit3d () {
  const ref3d = ref(null)
  const loadingFlag = ref(true)
  const publicPath = 'https://fe-hmzs.itheima.net'
  const init3dModel = async () => {
    let spline = new Application(ref3d.value)
    // 加载模型
    await spline?.load(`${publicPath}/scene.splinecode`)
    // 关闭loading
    loadingFlag.value = false
    // 绑定交互时间
    spline.addEventListener('mouseDown', async (e) => {
      const targetName = e.target.name
      if (targetName.indexOf('办公楼') > -1) {
        // 办公楼
        const res = await getParkInfoAPI(e.target.id)
        console.log(res)
      } else {
        // 停车场
      }
    })
  }
  return {
    ref3d,
    init3dModel,
    loadingFlag
  }
}