import React, { Component } from 'react';
import BookList from './BookList';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container, Button, Modal, Input, TextArea, Form } from 'semantic-ui-react';
import '../App.css';

class Books extends Component {

  redirectAddBook = () => {
    alert('CLICKED')
  }

  render(){
    return (
      <Container>
        <div className="books">
          <div className="books-header">
            <h1>Books</h1>
            <div>
              <Modal trigger={<Button color="pink" size="large">Add Book</Button>}>
                <Modal.Header>Add Book Form</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Form>
                      <Form.Field>
                        <label>Title:</label>
                        <Input />
                      </Form.Field>
                      <Form.Field>
                        <label>Genre:</label>
                        <Input/>
                      </Form.Field>
                      <Form.Field>
                        <label>Author:</label>
                        <Input/>
                      </Form.Field>
                      <Form.Field>
                        <label>Description:</label>
                        <TextArea autoHeight />
                      </Form.Field>
                      <Button color="pink" type="submit">Submit New Book</Button>
                    </Form>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </div>
          </div>
          <BookList books={this.props.books }/>
        </div>
      </Container>
    )
  }
}

export default Books;
