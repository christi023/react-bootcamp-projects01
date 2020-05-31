import React, { Component } from 'react';
import uuid from 'uuid/dist/v4';

import './NewTodoForm.css';

export default class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { task: '' };

    // bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange method
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  // handleSubmit method
  handleSubmit(e) {
    e.preventDefault();
    this.props.createTodo({ ...this.state, id: uuid(), completed: false });
    this.setState({ task: '' }); // clearing the form
  }

  render() {
    return (
      <form className="NewTodoForm" onSubmit={this.handleSubmit}>
        <label htmlFor="task">New Todo</label>
        <input
          type="text"
          placeholder="New Todo"
          id="task"
          name="task"
          value={this.state.task}
          onChange={this.handleChange}
        />
        <button>Add Todo</button>
      </form>
    );
  }
}
