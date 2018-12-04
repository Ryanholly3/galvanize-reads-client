import React, { Component } from 'react';
import Book from './Book'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import '../App.css';

class BookList extends Component {

  bookItem(){
    return this.props.books.map((book, i) => <Book key={i} title={book.title} genre={book.genre} description={book.description} coverUrl={book.cover_url} />)
  }

  render(){
    return (
      <div className="bookList">
        { this.bookItem() }
      </div>
    )
  }
}

export default BookList;
