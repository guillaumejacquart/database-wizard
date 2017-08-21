import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import { ApolloClient, ApolloProvider,createNetworkInterface } from 'react-apollo';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { wizardReducer } from './reducers';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj6hpb0462p9o0110xggckvyg/graphql'
});

const client = new ApolloClient({
  networkInterface: networkInterface
});

const store = createStore(
  combineReducers({
    wizard: wizardReducer,
    apollo: client.reducer(),
  }),
  {}, // initial state
  compose(
      applyMiddleware(client.middleware()),
      autoRehydrate(),
      // If you are using the devToolsExtension, you can add it here also
      (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

persistStore(store);

ReactDOM.render(
<ApolloProvider store={store} client={client}>
  <App />
</ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
