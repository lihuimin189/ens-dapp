 
 
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";


import resolvers, { defaults } from './api/resolvers/rootResolver'
import typeDefs from './api/schema'



import { SchemaLink } from '@apollo/client/link/schema'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { addMocksToSchema } from '@graphql-tools/mock'
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
//、 const schemaWithMocks = addMocksToSchema({ schema })

const cache = new InMemoryCache(window.__APOLLO_STATE__)

const graphqlClient = new ApolloClient({
  cache,
  link: new SchemaLink({ schema })//这里我们只专注前端，模拟后台数据

})

ReactDOM.render(
  <ApolloProvider client={graphqlClient}>
      <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
