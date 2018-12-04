import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import './App.css';

class Home extends Component {

  render(){
    return (
      <div className="home">
        <h1>HOME PAGE</h1>
      </div>
    )
  }
}

export default Home;
