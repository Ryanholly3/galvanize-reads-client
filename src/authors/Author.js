import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Table, Button, Input, Form, Modal, TextArea, Icon } from 'semantic-ui-react';
import '../App.css';

class Author extends Component {

  history = (e) =>{
    var listConstruct = [];
    for(let i = 0; i < this.props.bookSearch.length; i++){
      if(this.props.bookSearch[i].title.indexOf(e.target.innerText) !== -1){
        listConstruct.push(this.props.bookSearch[i]);
      }
    }
    this.props.titleFilter(listConstruct)
    this.props.history.push('/books')
  }

  renderBooks = () =>{
    let bookArray =[];
    for(let i = 0; i < this.props.books.length; i++){
      bookArray.push(this.props.books[i].title)
    }
    return bookArray.map((book, i) => <p><a key={i} onClick={ this.history }>{`${bookArray[i]}`}</a></p>)
  }


  deleteAuthor = () =>{
    var stringId = this.props.authorId.toString()
    console.log(stringId)
    this.props.deleteAuthor(stringId)
  }

  deleteAuthor = () =>{
    var authorId = this.props.authorId;
    console.log('authorId:', authorId)
    var newAuthorArray = []
    for(let i = 0; i < this.props.authorSearch.length; i++){
      if(this.props.authorId !== this.props.authorSearch[i].author_id){
        newAuthorArray.push(this.props.authorSearch[i])
      }
    }
    var authorIdString = this.props.authorId.toString()

    this.props.deleteAuthorRender(newAuthorArray, authorIdString)

  }

  render(){

    var booksList = '';
    for(let i = 0; i < this.props.bookSearch.length; i++){
      booksList += this.props.bookSearch[i].title + ' ';
    }

    return (
      <Table.Row>
        <Table.Cell><img src={this.props.portraitUrl} alt="Author portrait" className="author-portrait" /></Table.Cell>
        <Table.Cell>
          <p><b>Name</b> { `${this.props.firstName} ${this.props.lastName}` } </p>
          <p><b>Books:</b></p>
          { this.renderBooks() }
          <br/>
          <Modal size="tiny" trigger={<Button size="small" color="pink">Edit Author</Button>}>
            <Modal.Header>Edit Author Form</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Form>
                  <Form.Field>
                    <label>First Name</label>
                    <Input value={ this.props.firstName}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Last Name:</label>
                    <Input value={ this.props.lastName }/>
                  </Form.Field>
                  <Form.Field>
                    <label>Books:</label>
                    <Input value={ booksList }/>
                  </Form.Field>
                  <Form.Field>
                    <label>Portrait Url:</label>
                    <Input value={ this.props.portraitUrl }/>
                  </Form.Field>
                  <Form.Field>
                    <label>Biography</label>
                    <TextArea autoHeight value={ this.props.biography }/>
                  </Form.Field>
                  <Button color="red" >Discard Changes</Button>
                  <Button color="green" >Save Changes</Button>
                </Form>
              </Modal.Description>
            </Modal.Content>
          </Modal>
          <Modal trigger={<Button size="small" color="pink">Delete Author</Button>} basic size='small'>
            <Modal.Content className="centered">
              <h1> Are you sure you'd like to delete this author?</h1>
              <h1>{ `${this.props.firstName} ${this.props.lastName}` }</h1>
            </Modal.Content>
            <Modal.Actions>
              <div className="centered">
                <Button basic color='red'inverted>
                  <Icon name='remove' /> No, Don't Delete
                </Button>
                <Button color='green' inverted onClick={ this.deleteAuthor }>
                  <Icon name='checkmark' /> Yes, Delete
                </Button>
              </div>
            </Modal.Actions>
          </Modal>
        </Table.Cell>
        <Table.Cell>{ this.props.biography }</Table.Cell>
      </Table.Row>
    )
  }
}

export default Author;
