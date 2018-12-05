import React, { Component } from 'react';
import Home from './home/Home';
import Books from './books/Books';
import Authors from './authors/Authors';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state= {
      authors: [],
      books: [],
    }
  }

  async componentDidMount() {
    const bookResponse = await fetch('http://localhost:3001/books');
    const authorResponse = await fetch('http://localhost:3001/authors');
    const bookjson = await bookResponse.json();
    const authorjson = await authorResponse.json();
    this.setState({
      books: bookjson.books,
      authors: authorjson.authors
    });
  }

  addBook = async (book) =>{
    console.log('post triggered')
    const response = await fetch('http://localhost:3001/books', {
      method: 'POST',
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const posted = await response.json()
    console.log(posted)
    this.setState({
      books: this.state.books.concat(posted)
    })
  }

  deleteBook = async (bookId) =>{
    const response = await fetch(`http://localhost:3001/books/${bookId}`, {
      method: 'DELETE'
    })
    const deleted = await response.json()

    var newBook = this.state.books
    newBook.splice(bookId, 1)
    this.setState({
      books: newBook
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Menu color="purple" size="massive" inverted>
                <Menu.Item as={ Link } name='Home' to='/'>
                  <Icon name='student'/>
                  Galvanize Reads
                </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item as={ Link } name='Authors' to='/authors'>
                  <Icon name='users'/>
                  Authors
                </Menu.Item>
                <Menu.Item as={ Link } name='Books' to='/books'>
                  <Icon name='book'/>
                  Books
                </Menu.Item>
              </Menu.Menu>
            </Menu>
            <Route exact
                path="/"
                render={(props)=> <Home/> }
              />
              <Route
                path="/books"
                render={(props)=> <Books books={ this.state.books } addBook={this.addBook} deleteBook={this.deleteBook}/> }
              />
              <Route
                path="/authors"
                render={(props)=> <Authors /> }
              />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
