 
import getWeb3, { getAccounts } from '../web3'
import merge from 'lodash/merge'
// import fifsResolvers, { defaults as fifsDefaults } from './fifsResolver'
import managerResolvers, { defaults as managerDefaults } from './managerResolver'
import { gql } from "@apollo/client";
import { getOwner, getRootDomain } from '../registry'
const rootDefaults = {
  web3: {
    accounts: [],
    __typename: 'Web3'
  },
  loggedIn: null,
  pendingTransactions: [],
  transactionHistory: []
}

const resolvers = {
  Web3: {
    accounts: () => getAccounts()
  },
  Query: {
    web3: async (_, variables, context) => {
      try {
        return {
          ...(await getWeb3()),
          __typename: 'Web3'
        }
      } catch (e) {
        console.error(e)
        return null
      }
    },
  
    people: async () => {
      debugger
      const response = await fetch('https://emerald-ink.glitch.me/people')
      const people = await response.json()

      return people.map(person => ({
        ...person,
        __typename: 'thing'
      }))

      //   return [
      //     { name: 1456, id: 'w33423232323'  }
          
      //   ]
    }
  },

  Mutation: {}
  // Mutation: {
  //   addNode: async (_, { name }, { cache }) => {
  //     debugger;
  //     const owner = await getOwner(name)
  //     //Return null if no owner
  //     if (parseInt(owner, 16) === 0) {
  //       return null
  //     }

  //     //Get all nodes
  //     const query = gql`
  //       query nodes {
  //         nodes {
  //           name
  //           owner
  //           label
  //           resolver
  //           addr
  //           content
  //           nodes
  //         }
  //       }
  //     `
  //     const { nodes } = cache.readQuery({ query })

  //     //Create Node
  //     let node = {
  //       name,
  //       owner,
  //       __typename: 'Node'
  //     }

  //     //Write to cache

  //     const rootNode = await getRootDomain(name).then(rootDomainRaw => {
  //       //console.log(rootDomainRaw)
  //       const newNode = { ...node, ...rootDomainRaw }
  //       const data = {
  //         nodes: [...nodes, newNode]
  //       }

  //       cache.writeData({ data })
  //       return newNode
  //     })

  //     console.log('ROOT NODE', rootNode)

  //     return rootNode
  //   }
  // }
}

const defaults = merge(rootDefaults, managerDefaults)

export default merge(resolvers, managerResolvers)

export { defaults }
