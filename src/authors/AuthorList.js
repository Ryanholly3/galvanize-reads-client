import React, { Component } from 'react';
import Author from './Author';
import { Table, Input, Segment } from 'semantic-ui-react';
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
    return this.props.authorSearch.map((author, i) => {
      return (<Author
        key={i}
        history={this.props.history}
        id={i}
        authorId={author.author_id}
        firstName={author.first_name}
        lastName={author.last_name}
        biography={author.biography}
        portraitUrl={author.portrait_url}
        books={author.books}
        bookSearch={this.props.bookSearch}
        authorSearch={this.props.authorSearch}
        deleteAuthor={this.props.deleteAuthor}
        titleFilter={this.props.titleFilter}
        deleteAuthorRender={this.props.deleteAuthorRender}
      />)
    })
  }

  render(){
    return (
      <div className="authorList">
        <Segment className="author-search-bar">
          <Input type="text" className="search-width" placeholder="search for a author..." onChange={ this.changeSearch }/>
          <Input type="submit" value="Search by Last Name" onClick={ this.authorFilter }/>
          <Input type="submit" value="Reset Search" onClick={ this.authorReset }/>
          { this.searchResult() }
        </Segment>
        <Table color='grey' striped className="author-table">
          <Table.Header>
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
