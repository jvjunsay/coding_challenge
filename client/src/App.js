import React, {Component} from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import {ApolloProvider, withApollo} from 'react-apollo';
import Search from './components/Search';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const SearchWithClient = withApollo(Search);
class App extends Component {
  render() {
    
    return (
      <ApolloProvider client={client}>
        <div className="App">       
          <SearchWithClient   />          
        </div>
      </ApolloProvider>
    );
  }
}
export default App;
