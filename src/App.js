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
      booksApp: [],
      bookSearch: [],
      nextBookId: null,
      authorsApp: [],
      authorSearch: [],
      nextAuthorId: null,
    }
  }

  async componentDidMount() {
    const bookResponse = await fetch('https://shrouded-retreat-53312.herokuapp.com/books');
    const authorResponse = await fetch('https://shrouded-retreat-53312.herokuapp.com/authors');
    const bookjson = await bookResponse.json();
    const authorjson = await authorResponse.json();

    const numberBooks = bookjson.books.length;
    const numberAuthors = authorjson.authors.length;
    this.setState({
      booksApp: bookjson.books,
      bookSearch: bookjson.books,
      nextBookId: numberBooks,
      authorsApp: authorjson.authors,
      authorSearch: authorjson.authors,
      nextAuthorId: numberAuthors,
    });
  }



  addBookRender = (newBook, bookForServer) =>{
    newBook.book_id = this.state.nextBookId;

    this.setState({
      bookSearch: this.state.booksApp.concat(newBook),
    })
    this.addBook(bookForServer)
  }

  addBook = async (book) =>{
    const response = await fetch('http://localhost:3001/books', {
      method: 'POST',
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    let posted = await response.json()
    posted = posted.book;
    posted.book_id = posted.id;
    delete posted.id;

    this.setState({
      booksApp: this.state.booksApp.concat(posted),
      nextBookId: this.state.nextBookId + 1,
    })
  }




  addAuthorRender = (newAuthor, authorForServer) =>{
    newAuthor.author_id = this.state.nextAuthorId;

    this.setState({
      authorSearch: this.state.authorsApp.concat(newAuthor),
    })
    this.addAuthor(authorForServer)
  }

  addAuthor = async (author) =>{
    const response = await fetch('https://shrouded-retreat-53312.herokuapp.com/authors', {
      method: 'POST',
      body: JSON.stringify(author),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    let posted = await response.json()
    posted = posted.author;
    posted.author_id = posted.id;
    delete posted.id;

    this.setState({
      authorsApp: this.state.authorsApp.concat(posted),
      nextAuthorId: this.state.nextAuthorId + 1,
    })
  }




  deleteBookRender = (newBookArray, databaseBookIdString, bookAppId) =>{
    this.setState({
      bookSearch: newBookArray,
    })

    this.deleteBook(databaseBookIdString, bookAppId)
  }

  deleteBook = async (databaseBookIdString) =>{
    await fetch(`https://shrouded-retreat-53312.herokuapp.com/books/${databaseBookIdString}`, {
      method: 'DELETE'
    })
    var bookIdInt = parseInt(databaseBookIdString)
    var newBook = this.state.booksApp

    var filteredBook = newBook.filter((book) =>{
      return book.book_id !== bookIdInt
    })
    this.setState({
      booksApp: filteredBook,
    })
  }




  deleteAuthorRender = (newAuthorArray, databaseAuthorIdString) =>{
    this.setState({
      authorSearch: newAuthorArray,
    })

    this.deleteAuthor(databaseAuthorIdString)
  }

  deleteAuthor = async (databaseAuthorIdString) =>{
    await fetch(`https://shrouded-retreat-53312.herokuapp.com/authors/${databaseAuthorIdString}`, {
      method: 'DELETE'
    })

    var authorIdInt = parseInt(databaseAuthorIdString)
    var newAuthor = this.state.authorsApp

    var filteredAuthor = newAuthor.filter((author) =>{
      return author.author_id !== authorIdInt
    })
    this.setState({
      authorsApp: filteredAuthor,
    })
  }



  titleFilter = (item) => {
    this.setState({
      bookSearch: item
    })
  }

  authorFilter = (item) => {
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
            <Menu inverted className="menu" size="massive">
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
