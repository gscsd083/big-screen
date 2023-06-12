import { ref } from 'vue'
import { getParkInfoAPI } from '@/apis'

export function useParkInfo () {
  const parkInfo = ref({})
  const getParkInfo = async () => {
    const res = await getParkInfoAPI()
    parkInfo.value = res.data
  }
  return {
    parkInfo,
    getParkInfo
  }
}
