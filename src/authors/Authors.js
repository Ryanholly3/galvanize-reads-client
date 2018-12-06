import React, { Component } from 'react';
import AuthorList from './AuthorList';
import { Container, Button, Modal, Input, TextArea, Form } from 'semantic-ui-react';
import '../App.css';

class Authors extends Component {
  constructor(props){
    super(props);
    this.state= {
      first_name:'',
      last_name:'',
      biography:'',
      portrait_url:'',
      failedSubmit: false,
      modalOpen: false,
    }
  }


  captureFirstName = (e) => {
    e.preventDefault();
    this.setState({
      first_name: e.target.value,
      failedSubmit: false
    })
  }

  captureLastName = (e) => {
    e.preventDefault();
    this.setState({
      last_name: e.target.value,
      failedSubmit: false
    })
  }

  captureBiography = (e) =>{
    e.preventDefault();
    this.setState({
      biography: e.target.value,
      failedSubmit: false
    })
  }

  captureUrl = (e) =>{
    e.preventDefault();
    this.setState({
      portrait_url: e.target.value,
      failedSubmit: false
    })
  }

  handleOpen = () =>{
    this.setState({
      first_name:'',
      last_name:'',
      biography:'',
      portrait_url:'',
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
    if(this.state.first_name !== '' && this.state.last_name !== '' && this.state.biography !== '' && this.state.portrait_url !== ''){

      const newAuthor = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        biography: this.state.biography,
        portrait_url: this.state.portrait_url,
      }

      const authorForServer = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        biography: this.state.biography,
        portrait_url: this.state.portrait_url,
      }

      this.props.addAuthorRender(newAuthor, authorForServer)

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
          Please fill out all fields!
        </div>
      )
    }
  }

  render(){
    return (
      <Container>
        <div className="authors">
          <div className="authors-header">
            <h1>Authors</h1>
            <div>
              <Modal size="tiny" open={this.state.modalOpen} trigger={<Button color="red" size="large" onClick={this.handleOpen}>Add Author</Button>}>
                <Modal.Header>Add Author Form</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Form >
                      <Form.Field>
                        <label>First Name:</label>
                        <Input onChange={ this.captureFirstName } />
                      </Form.Field>
                      <Form.Field>
                        <label>Last Name:</label>
                        <Input onChange={ this.captureLastName } />
                      </Form.Field>
                      <Form.Field>
                        <label>Portrait Url:</label>
                        <Input onChange={ this.captureUrl }/>
                      </Form.Field>
                      <Form.Field>
                        <label>Biography:</label>
                        <TextArea autoHeight onChange={ this.captureBiography } />
                      </Form.Field>
                      { this.formStatusMessage() }
                      <Button color="red" type="button" onClick={ this.handleClose } >EXIT</Button>
                      <Button color="green" type="button" onClick={ this.submitForm } >Submit New Author</Button>
                    </Form>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </div>
          </div>
          <AuthorList
            history={this.props.history}
            authorsApp={this.props.authorsApp}
            books={this.props.books}
            bookSearch={this.props.bookSearch}
            authorSearch={this.props.authorSearch}
            authorFilter={this.props.authorFilter}
            authorReset={this.props.authorReset}
            deleteAuthor={this.props.deleteAuthor}
            titleFilter={this.props.titleFilter}
            deleteAuthorRender={this.props.deleteAuthorRender}
          />
        </div>
      </Container>
    )
  }
}

export default Authors;
