import React, { Component } from 'react';
import BookList from './BookList';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container, Button, Modal, Input, TextArea, Form } from 'semantic-ui-react';
import '../App.css';

class Books extends Component {
  constructor(props){
    super(props);
    this.state= {
      title:'',
      genre:'',
      author:'',
      url:'',
      description:'',
      failedSubmit: false,
      addedBook: {},
      modalOpen: false
    }
  }

  captureTitle = (e) => {
    this.setState({
      title: e.target.value,
      failedSubmit: false
    })
  }

  captureGenre = (e) =>{
    this.setState({
      genre: e.target.value,
      failedSubmit: false
    })
  }

  captureAuthor = (e) =>{
    this.setState({
      author: e.target.value,
      failedSubmit: false
    })
  }

  captureUrl = (e) =>{
    this.setState({
      url: e.target.value,
      failedSubmit: false
    })
  }

  captureDescription = (e) =>{
    this.setState({
      description: e.target.value,
      failedSubmit: false
    })
  }

  handleOpen = () =>{
    this.setState({
      modalOpen: true
    })
  }

  handleClose = ()=>{
    this.setState({
      title:'',
      genre:'',
      author:'',
      url:'',
      description:'',
      failedSubmit: false,
      addedBook: {},
      modalOpen: false
    })
  }

  submitForm = () =>{
    if(this.state.title !== '' && this.state.genre !== '' && this.state.author !== '' && this.state.url !== '' && this.state.description !== ''){
      //SEND DATA TO APP
      console.log('TRIGGERED')
      this.setState({
        title:'',
        genre:'',
        author:'',
        url:'',
        description:'',
        failedSubmit: false,
        addedBook: {},
        modalOpen: false
      })

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
                        <label>Author:</label>
                        <Input onChange={ this.captureAuthor } />
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
                      <Button color="red" onClick={ this.handleClose } >Discard New Book</Button>
                      <Button color="green" onClick={ this.submitForm } >Submit New Book</Button>
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
