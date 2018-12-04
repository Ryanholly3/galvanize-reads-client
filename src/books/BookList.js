import React, { Component } from 'react';
import Book from './Book'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import '../App.css';

class BookList extends Component {

  bookItem(){
    return this.props.books.map((book, i) => <Book key={i} title={book.title} genre={book.genre} description={book.description} coverUrl={book.cover_url} />)
  }

  render(){
    return (
      <div className="bookList">
        <Table color='purple' key='purple' striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width='one' >Book List</Table.HeaderCell>
              <Table.HeaderCell width='three' ></Table.HeaderCell>
              <Table.HeaderCell width='four' >Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.bookItem() }
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default BookList;
