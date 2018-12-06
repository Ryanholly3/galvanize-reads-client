import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import '../App.css';

class Home extends Component {

  render(){

    return (
      <Container>
        <div className="home">
          <div className="home-card">
            <h1 className="home-title-1">Galvanize</h1>
            <h1 className="home-title-2">Reads</h1>
            <div className="home-caption">
              <p>Welcome to Galvanize Reads!
              Search through our database of Authors and Books
              by clicking on the tabs in the upper right hand
              corner of this page. Enjoy!</p>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default Home;
