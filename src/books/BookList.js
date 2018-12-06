import React, { Component } from 'react';
import Book from './Book'
import { Table, Input, Segment } from 'semantic-ui-react';
import '../App.css';

class BookList extends Component {
  constructor(props){
    super(props);
    this.state= {
      search: '',
      notFound: false,
    }
  }

  changeSearch = (e) => {
    e.preventDefault();
    if(this.props.bookSearch.length === 0){
      this.props.bookReset()
    }
    this.setState({
      search: e.target.value,
      notFound: false,
    })
  }

  titleSearch = (e) => {
    e.preventDefault();
    var listConstruct = [];
    for(let i = 0; i < this.props.bookSearch.length; i++){
      if(this.props.bookSearch[i].title.indexOf(this.state.search) !== -1){
        listConstruct.push(this.props.bookSearch[i]);
      }
    }
    this.props.titleFilter(listConstruct)

    if(listConstruct.length === 0){
      this.setState({
        notFound: true,
      })
    }
  }

  bookReset = () =>{
    this.props.bookReset();
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
          No Book Found
        </div>
      )
    }
  }

  bookItem(){
    return this.props.bookSearch.map((book, i) => {
      return(
        <Book
          key={i}
          id={i}
          bookId={book.book_id}
          title={book.title}
          genre={book.genre}
          description={book.description}
          coverUrl={book.cover_url}
          authors={book.authors}
          deleteBook={this.props.deleteBook}
          history={this.props.history}
          authorSearch={this.props.authorSearch}
          authorsApp={this.props.authorsApp}
          booksApp={this.props.booksApp}
          bookSearch={this.props.bookSearch}
          authorFilter={this.props.authorFilter}
          deleteBookRender={this.props.deleteBookRender}
        />
      )
    })
  }

  render(){

    return (
      <div className="bookList">
        <Segment className="book-search-bar">
          <Input type="text" className="search-width" placeholder="search for a book..." onChange={ this.changeSearch }/>
          <Input type="submit" value="Search by Title" onClick={ this.titleSearch }/>
          <Input type="submit" value="Reset Search" onClick={ this.bookReset }/>
          { this.searchResult() }
        </Segment>
        <Table className="book-table">
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
