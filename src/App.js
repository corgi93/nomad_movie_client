import React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">

      </div>  
    </ApolloProvider>
  );
}

export default App;
