import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import '../App.css';

class Book extends Component {

  render(){
    return (
      <Table.Row>
        <Table.Cell>{ this.props.title }</Table.Cell>
        <Table.Cell>{ this.props.genre }</Table.Cell>
        <Table.Cell>{ this.props.description }</Table.Cell>
      </Table.Row>
    )
  }
}

export default Book;
