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
      bookSearch: [],
      authorSearch: [],
    }
  }

  async componentDidMount() {
    const bookResponse = await fetch('http://localhost:3001/books');
    const authorResponse = await fetch('http://localhost:3001/authors');
    const bookjson = await bookResponse.json();
    const authorjson = await authorResponse.json();
    this.setState({
      books: bookjson.books,
      bookSearch: bookjson.books,
      authors: authorjson.authors,
      authorSearch: authorjson.authors,
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
      books: this.state.books.concat(posted),
      bookSearch: this.state.books.concat(posted)
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
      books: newBook,
      bookSearch: newBook,
    })
  }

  addAuthor = async (author) =>{
    console.log('post author triggered')
    const response = await fetch('http://localhost:3001/authors', {
      method: 'POST',
      body: JSON.stringify(author),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const posted = await response.json()
    console.log(posted)
    this.setState({
      authors: this.state.authors.concat(posted),
      authorSearch: this.state.authors.concat(posted),
    })
  }

  deleteAuthor = async (authorId) =>{
    const response = await fetch(`http://localhost:3001/authors/${authorId}`, {
      method: 'DELETE'
    })
    const deleted = await response.json()

    var newAuthor = this.state.authors
    newAuthor.splice(authorId, 1)
    this.setState({
      authors: newAuthor,
      authorSearch: newAuthor,
    })
  }

  titleFilter = (item) => {
    this.setState({
      bookSearch: item
    })
  }

  authorFilter = (item) => {
    console.log(item)
    this.setState({
      authorSearch: item
    })
  }

  bookReset = () =>{
    this.setState({
      bookSearch: this.state.books,
    })
  }

  authorReset = () =>{
    this.setState({
      authorSearch: this.state.authors,
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
                render={(props)=> <Books books={ this.state.books } addBook={this.addBook} deleteBook={this.deleteBook} bookSearch={this.state.bookSearch} titleFilter={this.titleFilter} bookReset={this.bookReset} /> }
              />
              <Route
                path="/authors"
                render={(props)=> <Authors authors={ this.state.authors } addAuthor={this.addAuthor} deleteAuthor={this.deleteAuthor} authorSearch={this.state.authorSearch} authorFilter={this.authorFilter} authorReset={this.authorReset}/> }
              />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
