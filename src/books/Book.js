import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Table, Button, Input, Form, Modal, TextArea, Icon } from 'semantic-ui-react';
import '../App.css';

class Book extends Component {

  history = (e) =>{
    var listConstruct = [];
    for(let i = 0; i < this.props.authorsList.length; i++){
      if(this.props.authorsList[i].last_name.indexOf(e.target.innerText) !== -1){
        listConstruct.push(this.props.authorsList[i]);
      }
    }
    this.props.authorFilter(listConstruct)
    this.props.history.push('/authors')
  }

  renderAuthors = () =>{
    let authorArray =[];
    for(let i = 0; i < this.props.authors.length; i++){
      authorArray.push(this.props.authors[i].last_name)
    }
    return authorArray.map((author, i) => <a key={i} onClick={ this.history }>{`${authorArray[i]}`}</a>)
  }

  deleteBook = () =>{
    var stringId = this.props.bookId.toString()
    this.props.deleteBook(stringId)
  }

  render(){
    var authorList = '';
    for(let i = 0; i < this.props.authors.length; i++){
      authorList += this.props.authors[i].first_name + ' ';
      authorList += this.props.authors[i].last_name + ', ';
    }

    return (
      <Table.Row>
        <Table.Cell><img src={this.props.coverUrl} alt="book cover" className="book-cover" /></Table.Cell>
        <Table.Cell>
          <p><b>Title:</b> { this.props.title }</p>
          <p><b>Genre:</b> { this.props.genre }</p>
          <p><b>Authors:</b> { this.renderAuthors() }</p>
          <br/>
          <Modal size="tiny" trigger={<Button size="small" color="pink">Edit Book</Button>}>
            <Modal.Header>Edit Book Form</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Form>
                  <Form.Field>
                    <label>Title:</label>
                    <Input value={ this.props.title }/>
                  </Form.Field>
                  <Form.Field>
                    <label>Genre:</label>
                    <Input value={ this.props.genre }/>
                  </Form.Field>
                  <Form.Field>
                    <label>Author:</label>
                    <Input value={ authorList }/>
                  </Form.Field>
                  <Form.Field>
                    <label>Cover Url:</label>
                    <Input value={ this.props.coverUrl }/>
                  </Form.Field>
                  <Form.Field>
                    <label>Description:</label>
                    <TextArea autoHeight value={ this.props.description }/>
                  </Form.Field>
                  <Button color="red" >Discard Changes</Button>
                  <Button color="green" >Save Changes</Button>
                </Form>
              </Modal.Description>
            </Modal.Content>
          </Modal>
          <Modal trigger={<Button size="small" color="pink">Delete Book</Button>} basic size='small'>
            <Modal.Content className="centered">
              <h1> Are you sure you'd like to delete this book?</h1>
              <h1>{ this.props.title }</h1>
            </Modal.Content>
            <Modal.Actions>
              <div className="centered">
                <Button basic color='red'inverted>
                  <Icon name='remove' /> No, Don't Delete
                </Button>
                <Button color='green' inverted onClick={ this.deleteBook }>
                  <Icon name='checkmark' /> Yes, Delete
                </Button>
              </div>
            </Modal.Actions>
          </Modal>
        </Table.Cell>
        <Table.Cell>{ this.props.description }</Table.Cell>
      </Table.Row>
    )
  }
}

export default Book;
