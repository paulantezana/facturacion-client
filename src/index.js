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