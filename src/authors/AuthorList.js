import React, { Component } from 'react';
import Author from './Author'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import '../App.css';

class AuthorList extends Component {

  authorItem(){
    return this.props.authors.map((author, i) => <Author key={i} authorId={author.author_id} firstName={author.first_name} lastName={author.last_name} biography={author.biography} portraitUrl={author.portrait_url} books={author.books} deleteAuthor={this.props.deleteAuthor}/>)
  }

  render(){
    return (
      <div className="authorList">
        <Table color='purple' key='purple' striped>
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
