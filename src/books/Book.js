import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';
import '../App.css';

class Book extends Component {

  render(){
    return (
      <Table.Row>
        <Table.Cell><img src={this.props.coverUrl} alt="book cover" className="book-cover" /></Table.Cell>
        <Table.Cell>
          <p><b>Title:</b> { this.props.title }</p>
          <p><b>Genre:</b> { this.props.genre}</p>
          <p><b>Authors:</b></p>
          <br/>
          <Button size="small" color="pink">Edit Book</Button>
          <Button size="small" color="pink">Delete Book</Button>
        </Table.Cell>
        <Table.Cell>{ this.props.description }</Table.Cell>
      </Table.Row>
    )
  }
}

export default Book;
