import React from "react";
import { ApolloProvider } from "react-apollo";
import client from "./apolloClient";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import Mutation from "./Mutation";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact={true} path={"/"} component={Home} />
        <Route exact={true} path={"/details/:movieId"} component={Detail} />
        <Route exact={true} path="/mutation" component={Mutation}/>
      </Router>
    </ApolloProvider>
  );  
}

export default App;
