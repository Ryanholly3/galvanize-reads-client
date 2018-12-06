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
      authorsApp: [],
      booksApp: [],
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
      booksApp: bookjson.books,
      bookSearch: bookjson.books,
      authorsApp: authorjson.authors,
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

    this.setState({
      booksApp: this.state.booksApp.concat(posted),
      bookSearch: []
    })
  }

  deleteBook = async (bookId) =>{
    const response = await fetch(`http://localhost:3001/books/${bookId}`, {
      method: 'DELETE'
    })
    const deleted = await response.json()

    var newBook = this.state.booksApp
    newBook.splice(bookId, 1)
    this.setState({
      booksApp: newBook,
      bookSearch: newBook,
    })
  }

  addAuthor = async (author) =>{
    const response = await fetch('http://localhost:3001/authors', {
      method: 'POST',
      body: JSON.stringify(author),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const posted = await response.json()

    this.setState({
      authorsApp: this.state.authorsApp.concat(posted),
    })
  }

  deleteAuthor = async (authorId) =>{
    console.log('TRIGGERED')
    const response = await fetch(`http://localhost:3001/authors/${authorId}`, {
      method: 'DELETE'
    })
    const deleted = await response.json()
    var newAuthor = this.state.authorsApp
    newAuthor.splice(authorId, 1)
    this.setState({
      authorsApp: newAuthor,
    })
  }

  addAuthorRender = (newAuthor) =>{
    this.setState({
      authorSearch: newAuthor,
    })
    // this.addAuthor(newAuthor)
  }

  deleteAuthorRender = (newAuthors, authorIdString) =>{
    this.setState({
      authorSearch: newAuthors,
    })

    this.deleteAuthor(authorIdString)
  }

  addBookRender = (newBook) =>{
    this.setState({
      bookSearch: newBook,
    })
    // this.addBook(newBook)
  }

  deleteBookRender = (newBookArray, bookIdString) =>{
    this.setState({
      bookSearch: newBookArray,
    })

    this.deleteBook(bookIdString)
  }

  titleFilter = (item) => {
    this.setState({
      bookSearch: item
    })
  }

  authorFilter = (item) => {
    console.log('author filter app item:', item)
    this.setState({
      authorSearch: item
    })
  }

  bookReset = () =>{
    this.setState({
      bookSearch: this.state.booksApp,
    })
  }

  authorReset = () =>{
    this.setState({
      authorSearch: this.state.authorsApp,
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
                render={(props)=> {
                  return (
                    <Books
                      history={props.history}
                      booksApp={ this.state.booksApp }
                      authorsApp={this.state.authorsApp}
                      addBook={this.addBook}
                      deleteBook={this.deleteBook}
                      bookSearch={this.state.bookSearch}
                      authorSearch={this.state.authorSearch}
                      titleFilter={this.titleFilter}
                      bookReset={this.bookReset}
                      authorFilter={this.authorFilter}
                      addBookRender={this.addBookRender}
                      deleteBookRender={this.deleteBookRender}
                    />)
                }}
              />
              <Route
                path="/authors"
                render={(props)=> {
                  return (
                    <Authors
                      history={props.history}
                      authorsApp={ this.state.authorsApp }
                      booksApp={ this.state.booksApp }
                      addAuthor={this.addAuthor}
                      deleteAuthor={this.deleteAuthor}
                      authorSearch={this.state.authorSearch}
                      bookSearch={this.state.bookSearch}
                      authorFilter={this.authorFilter}
                      authorReset={this.authorReset}
                      titleFilter={this.titleFilter}
                      addAuthorRender={this.addAuthorRender}
                      deleteAuthorRender={this.deleteAuthorRender}
                    />)
                }}
              />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
