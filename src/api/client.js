import {
    ApolloClient,
    InMemoryCache 
  } from "@apollo/client";
import { SchemaLink } from '@apollo/client/link/schema'
import { makeExecutableSchema,addResolversToSchema } from '@graphql-tools/schema'

import resolvers, { defaults } from './resolvers/rootResolver'
import typeDefs from './schema'

import { addMocksToSchema } from '@graphql-tools/mock'
 

// console.log(resolvers);
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })


// const schemaWithMocks = addMocksToSchema({ schema,resolvers})

// const schemaWithMocks = addResolversToSchema({ schema:typeDefs,resolvers})
const cache = new InMemoryCache();//window.__APOLLO_STATE__
 

const graphqlClient = new ApolloClient({
  cache,
   link: new SchemaLink({ schema  }),//这里我们只专注前端，模拟后台数据
   typeDefs,
    resolvers
 
 })

export default graphqlClient;