import React from 'react';
import './App.css';
import Launches from './components/Launches'
import Launch from './components/Launch'
import logo from './img/logo.png'

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
import {BrowserRouter as Router , Route} from 'react-router-dom'

const client = new ApolloClient({
  uri : '/graphql'
})

function App() {
  return (
    <ApolloProvider client = {client}>
      <Router>
        <div className="container">
          <img src = {logo} 
          alt = 'spaceX' 
          style ={{width: 300, display :'block', margin : 'auto'}}/>
        </div>
        <Route exact path = '/' component = {Launches}/>
        <Route exact path = '/launch/:flight_number' component = {Launch}/>
      </Router>
     
    </ApolloProvider>
  );
}

export default App;
