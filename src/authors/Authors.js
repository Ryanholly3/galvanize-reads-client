import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import '../App.css';

class Authors extends Component {

  render(){
    return (
      <Container>
        <div className="authors">
          <h1>Authors</h1>
        </div>
      </Container>
    )
  }
}

export default Authors;
