import AppCall from './AppCall'
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

  app(app) {
    let appCall = new AppCall(this, app)
    return appCall
  }

  async request(dataInfo) {
    try {
      const apiInstance = new Api()
      const muonResponse = await apiInstance.post(this.BASE_URL, dataInfo)
      console.log(muonResponse)
      let { data } = muonResponse
      console.log(data)

      let _reqId = `0x${data.result?.cid.substr(1)}`
      console.log(_reqId)
      let signatures = data.result?.signatures?.map((s) => s.signature).sort()
      console.log(signatures)
      data = { ...data, signatures, _reqId }
      return data
    } catch (error) {
      console.log('error happend in request muon', error)
      return error.message
    }
  }
}

export default Muon
