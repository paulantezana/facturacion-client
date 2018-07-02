import React from 'react';
import ReactDOM from 'react-dom';

// Style sheets
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './main.scss';
import './utils/variables.scss';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';

// const httpLink = createHttpLink({
//     uri: 'http://localhost:7070/graphql',
// });
  
// const authLink = setContext((_, { headers }) => {
//     // get the authentication token from local storage if it exists
//     const token = localStorage.getItem('lkti');
//     // return the headers to the context so httpLink can read them
//     return {
//         headers: {
//             headers,
//             authorization: token ? `Bearer ${token}` : "",
//         }
//     }
// });

// const client = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache()
// });




const client = new ApolloClient({
    link: new createHttpLink({
        uri: 'http://localhost:7070/graphql'
    }),
    cache: new InMemoryCache()
});

import App from './router';

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
);