import React, { Component } from 'react';
import Home from './home/Home';
import Books from './books/Books';
import Authors from './authors/Authors';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state= {
      authors: [],
      books: [],
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Menu color="purple" size="massive" inverted>
                <Menu.Item as={ Link } name='Home' to='/'>
                  <Icon name='student'/>
                  Galvanize Reads
                </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item as={ Link } name='Authors' to='/authors'>
                  <Icon name='users'/>
                  Authors
                </Menu.Item>
                <Menu.Item as={ Link } name='Books' to='/books'>
                  <Icon name='book'/>
                  Books
                </Menu.Item>
              </Menu.Menu>
            </Menu>
            <Route exact
                path="/"
                render={(props)=> <Home/> }
              />
              <Route
                path="/books"
                render={(props)=> <Books /> }
              />
              <Route
                path="/authors"
                render={(props)=> <Authors /> }
              />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
