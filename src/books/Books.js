import React, { Component } from 'react';
import BookList from './BookList';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container, Button, Modal, Input, TextArea, Form, Icon } from 'semantic-ui-react';
import '../App.css';

class Books extends Component {
  constructor(props){
    super(props);
    this.state= {
      title:'',
      genre:'',
      cover_url:'',
      description:'',
      failedSubmit: false,
      modalOpen: false,
    }
  }


  captureTitle = (e) => {
    e.preventDefault();
    this.setState({
      title: e.target.value,
      failedSubmit: false
    })
  }

  captureGenre = (e) =>{
    e.preventDefault();
    this.setState({
      genre: e.target.value,
      failedSubmit: false
    })
  }

  captureUrl = (e) =>{
    e.preventDefault();
    this.setState({
      cover_url: e.target.value,
      failedSubmit: false
    })
  }

  captureDescription = (e) =>{
    e.preventDefault();
    this.setState({
      description: e.target.value,
      failedSubmit: false
    })
  }

  handleOpen = () =>{
    this.setState({
      title:'',
      genre:'',
      cover_url:'',
      description:'',
      failedSubmit: false,
      modalOpen: true,
    })
  }

  handleClose = () =>{
    this.forceUpdate()
    this.setState({
      modalOpen: false,
    })
  }

  submitForm = () => {
    if(this.state.title !== '' && this.state.genre !== '' && this.state.cover_url !== '' && this.state.description !== ''){
      //SEND DATA TO APP
      const newBook = {
        title: this.state.title,
        genre: this.state.genre,
        description: this.state.description,
        cover_url: this.state.cover_url,
      }

      this.props.addBook(newBook)
      this.forceUpdate()

    } else {
      this.setState({
        failedSubmit: true,
      })
    }
  }

  formStatusMessage(){
    if (this.state.failedSubmit === false){
      return(
        <div>
        </div>
      )
    } else if(this.state.failedSubmit === true){
      return(
        <div>
          Please complete all fields!
        </div>
      )
    }
  }

  render(){
    return (
      <Container>
        <div className="books">
          <div className="books-header">
            <h1>Books</h1>
            <div>
              <Modal size="tiny" open={this.state.modalOpen} trigger={<Button color="pink" size="large" onClick={this.handleOpen}>Add Book</Button>}>
                <Modal.Header>Add Book Form</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Form >
                      <Form.Field>
                        <label>Title:</label>
                        <Input onChange={ this.captureTitle } />
                      </Form.Field>
                      <Form.Field>
                        <label>Genre:</label>
                        <Input onChange={ this.captureGenre } />
                      </Form.Field>
                      <Form.Field>
                        <label>Cover Url:</label>
                        <Input onChange={ this.captureUrl }/>
                      </Form.Field>
                      <Form.Field>
                        <label>Description:</label>
                        <TextArea autoHeight onChange={ this.captureDescription } />
                      </Form.Field>
                      { this.formStatusMessage() }
                      <Button color="red" type="button" onClick={ this.handleClose } >EXIT</Button>
                      <Button color="green" type="button" onClick={ this.submitForm } >Submit New Book</Button>
                    </Form>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </div>
          </div>
          <BookList books={this.props.books } deleteBook={this.props.deleteBook}/>
        </div>
      </Container>
    )
  }
}

export default Books;
