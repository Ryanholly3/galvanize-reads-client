import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import '../App.css';

class Home extends Component {

  render(){
    return (
      <Container>
        <div className="home">
          <h1>HOME PAGE</h1>
        </div>
      </Container>
    )
  }
}

export default Home;
