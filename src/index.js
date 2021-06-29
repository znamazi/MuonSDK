import Eth from './apps/Eth'
import Api from './services/api'

class Muon {
  constructor(url, nSign) {
    this.BASE_URL = url
    this.nSign = nSign ? nSign : 2
    this.apps = {
      eth: new Eth(this)
    }
  }

  async request(dataInfo) {
    try {
      const apiInstance = new Api()
      const muonResponse = await apiInstance.post(this.BASE_URL, dataInfo)
      let { data } = muonResponse
      let signatures = data.result?.signatures?.map((s) => s.signature)
      data = { ...data, signatures }
      return data
    } catch (error) {
      // console.log('Error happend in request Muon', error)
      return error.message
    }
  }
}

export default Muon
