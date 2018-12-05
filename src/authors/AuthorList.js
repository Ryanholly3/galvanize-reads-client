import React, { Component } from 'react';
import Author from './Author'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Table, Input } from 'semantic-ui-react';
import '../App.css';

class AuthorList extends Component {
  constructor(props){
    super(props);
    this.state= {
      search: '',
      notFound: false,
    }
  }

  changeSearch = (e) => {
    e.preventDefault();

    if(this.props.authorSearch.length === 0){
      this.props.authorReset()
    }
    this.setState({
      search: e.target.value,
      notFound: false,
    })
  }

  authorFilter = (e) => {
    e.preventDefault();
    var listConstruct = [];
    for(let i = 0; i < this.props.authorSearch.length; i++){
      if(this.props.authorSearch[i].last_name.indexOf(this.state.search) !== -1){
        listConstruct.push(this.props.authorSearch[i]);
      }
    }
    this.props.authorFilter(listConstruct)

    if(listConstruct.length === 0){
      this.setState({
        notFound: true,
      })
    }
  }

  authorReset = () =>{
    this.props.authorReset();
    this.setState({
      notFound: false,
    })
  }

  searchResult = () =>{
    if(!this.state.notFound){
      return(
        <div>
        </div>
      )
    } else {
      return(
        <div>
          No Author Found
        </div>
      )
    }
  }

  authorItem(){
    return this.props.authorSearch.map((author, i) => <Author key={i} history={this.props.history} authorId={author.author_id} firstName={author.first_name} lastName={author.last_name} biography={author.biography} portraitUrl={author.portrait_url} books={author.books} bookList={this.props.books} deleteAuthor={this.props.deleteAuthor} titleFilter={this.props.titleFilter} />)
  }

  render(){
    return (
      <div className="authorList">
        <Table color='purple' key='purple' striped>
          <Table.Header>
            <Table.Row>
              <Input type="text" placeholder="search for a author..." onChange={ this.changeSearch }/>
              <Input type="submit" value="Search by Last Name" onClick={ this.authorFilter }/>
              <Input type="submit" value="Reset Search" onClick={ this.authorReset }/>
              { this.searchResult() }
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell width='one' >Author List</Table.HeaderCell>
              <Table.HeaderCell width='three' ></Table.HeaderCell>
              <Table.HeaderCell width='four' >Biography</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.authorItem() }
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default AuthorList;
