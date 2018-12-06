import React, { Component } from 'react';
import { Container, Card } from 'semantic-ui-react';
import '../App.css';

class Home extends Component {

  render(){
    const description = `Welcome to Galvanize Reads!
    Search through our database of Authors and Books
    by clicking on the tabs in the upper right hand
    corner of this page. Enjoy!`

    return (
      <Container>
        <div className="home">
        <Card color="red" className="home-card">
          <Card.Content header='Galvanize Reads' />
          <Card.Content description={description} />
        </Card>
        </div>
      </Container>
    )
  }
}

export default Home;
