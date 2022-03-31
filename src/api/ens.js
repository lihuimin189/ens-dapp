 
import getWeb3 from './web3'
 
import ENS, { getEnsAddress } from '@ensdomains/ensjs'




var contracts = {
  1: {
    registry: '0x314159265dd8dbb310642f98f50c066173c1259b'
  },
  3: {
    registry: '0x112234455c3a32fd11230c42e7bccd4a84e02010'
  }
}

let ens;
 

function getNamehash(name) {
  return getWeb3().then(({ web3 }) => {
    var node =
      '0x0000000000000000000000000000000000000000000000000000000000000000'
    if (name !== '') {
      var labels = name.split('.')
      for (var i = labels.length - 1; i >= 0; i--) {
        node = web3.sha3(node + web3.sha3(labels[i]).slice(2), {
          encoding: 'hex'
        })
      }
    }
    return node.toString()
  })
}

const getENS = async () => {
  let { web3,provider, networkId } = await getWeb3()

  debugger

  if (!ens) {
    // const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })
     
    ens = new ENS({ provider, ensAddress: getEnsAddress('1') })
  }

  return { ens, web3 }  
}
 

export default getENS
 export {
  getNamehash
 }
