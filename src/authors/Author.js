import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Table, Button, Input, Form, Modal, TextArea, Icon } from 'semantic-ui-react';
import '../App.css';

class Author extends Component {

  deleteAuthor = () =>{
    var stringId = this.props.authorId.toString()
    console.log(stringId)
    this.props.deleteAuthor(stringId)
  }

  render(){

    var booksList = '';
    for(let i = 0; i < this.props.books.length; i++){
      booksList += this.props.books[i].title + ' ';
    }

    return (
      <Table.Row>
        <Table.Cell><img src={this.props.portraitUrl} alt="Author portrait" className="author-portrait" /></Table.Cell>
        <Table.Cell>
          <p><b>Name</b> { `${this.props.firstName} ${this.props.lastName}` } </p>
          <p><b>Books:</b> { ` ${booksList}` }</p>
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
