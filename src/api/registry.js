 
import getENS,{getNamehash}  from './ens'

export async function getContent(name) {
    let { ENS } = await getENS()
    let resolver = await ENS.resolver(name)
    return resolver.content()
}

export async function getAddr(name) {
    let { ENS } = await getENS()
    let resolver = await ENS.resolver(name)
    return resolver.addr()
  }

export function getResolverDetails(node) {
    let addr = getAddr(node.name)
    let content = getContent(node.name)
    return Promise.all([addr, content]).then(([addr, content]) => ({
      ...node,
      addr,
      content
    }))
}


export async function getResolver(name) {
    let node = await getNamehash(name)
    let { ENS } = await getENS()
    let registry = await ENS.registryPromise
    return registry.resolverAsync(node)
}

export function getRootDomain(name) {
    return Promise.all([getOwner(name), getResolver(name)])
      .then(([owner, resolver]) => ({
        name,
        label: name.split('.')[0],
        owner,
        resolver,
        nodes: []
      }))
      .then(node => {
        let hasResolver = parseInt(node.resolver, 16) !== 0
        if (hasResolver) {
          return getResolverDetails(node)
        }
        return Promise.resolve(node)
      })
  }
  
export async function getOwner(name) {
    debugger
    let { ens, web3 } = await getENS();
    // var address = await ens.name('resolver.eth').getAddress();

    // var address = await ENS.name(name).getAddress() ;
    // ENS.name(name).getOwner().then(re=>{
    //   console.log(re)
    //   debugger
    // }).catch(er=>{
    //   console.log(er);
    //   debugger
    // })
    // let { ENS, web3 } = await getENS()
    // return ENS.owner(name)
    return ens.name(name).getOwner()
  
}
  