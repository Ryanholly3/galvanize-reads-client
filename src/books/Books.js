import React, { Component } from 'react';
import BookList from './BookList';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import '../App.css';

class Books extends Component {

  render(){
    return (
      <Container>
        <div className="books">
          <h1>Books</h1>
          <BookList books={this.props.books }/>
        </div>
      </Container>
    )
  }
}

export default Books;
