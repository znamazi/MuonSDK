import Eth from './apps/Eth'
import Api from './services/api'
// export * from './GetData'

class Muon {
  constructor(url, nSign) {
    console.log(url, nSign)
    this.BASE_URL = url
    this.nSign = nSign ? nSign : 2
    console.log(this)
    this.apps = {
      eth: new Eth(this)
    }
  }

  async request(dataInfo) {
    const apiInstance = new Api()
    console.log({ dataInfo })
    const muonResponse = await apiInstance.post(this.BASE_URL, dataInfo)
    let { data } = muonResponse
    console.log({ muonResponse })
    // let signatures = data.result.signatures.map((s) => s.signature)
    return data
    // return { data, signatures }
  }
}

export { Muon }
