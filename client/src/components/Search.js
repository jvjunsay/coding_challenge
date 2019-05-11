import React, { Component } from 'react';
import gql from 'graphql-tag';


const query = gql`
    query search($filter:String) {
        search(filter:$filter) {
            id,street,state,city,zip, user {
                firstName,lastName
            }
        }
    }
`;
class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    this.state = {
      searchText: '',
      searchResults: [],
      noResults: '',
      isLoading:false
    };
  }

  handleChange(event) {
    this.setState({searchText: event.target.value});
  }

  async handleSearch() {
    this.setState({isLoading:true});
    this.props.client.query({query, variables: {filter: this.state.searchText}}).then((data)=>{
      if(data.data.search.length<1) {
        this.setState({noResults:'No Results Found!!!'});
      }
      this.setState({searchResults:data.data.search});      
    }).finally(()=>{
      this.setState({isLoading:false});
    });
    
  }
  render() {

    let {isLoading, searchText, searchResults} = this.state;

    let results = searchResults.map((item, key) =>
        <li className="list-group-item list-group-item-action flex-column align-items-start" key={item.id}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Property Address</h5>         
          </div>        
          <p className="mb-2">{item.street}, {item.city}, {item.state}</p>
          <p className="mb-2">{item.zip}</p>
          <small>User: {item.user.firstName} {item.user.lastName}</small>
        </li>
    );

    return (
      <div className="bs-component">
        <h1 className="display-4 my-3">Code Challenge</h1>
        <form>
          <label>Search For Properties:</label>
          <div className="input-group">          
            <input type="text" className="form-control" onChange={this.handleChange} placeholder="Search" value={searchText}/>
            <span className="input-group-btn">
              <button className="btn btn-primary"   type="button" disabled={isLoading} onClick={!isLoading ? this.handleSearch : null} >
                {isLoading ? 'Loading…' : 'Search'}
              </button>
            </span>         
          </div>
        </form>
        <br />
        <br />
        <div>
          {(() => {
            if(this.state.searchResults.length>0) {
              return (<div>
                <h4>Results Found ({this.state.searchResults.length})</h4>
                <ul className="list-group">
                  {results}
                </ul>
              </div>);
            }else {
              return (<h4>{this.state.noResults}</h4>);
            }
          })()}
        </div>
      </div>
    )
  }
}

export default Search
