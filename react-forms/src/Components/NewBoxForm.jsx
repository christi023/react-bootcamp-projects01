import React, { Component } from 'react';
// imports
import uuid from 'uuid/dist/v4';

export default class NewBoxForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '',
      width: '',
      color: '',
    };
    // bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleSubmit method
  handleSubmit(e) {
    e.preventDefault(); // prevent default on form
    // uuid();  give a unique id string
    const newBox = { ...this.state, id: uuid() };
    this.props.createBox(newBox); // create boxes
    this.setState({
      // clearing the input on forms
      height: '',
      width: '',
      color: '',
    });
  }

  // handleChange method
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="height">Height</label>
          <input
            type="text"
            name="height"
            value={this.state.height}
            onChange={this.handleChange}
            id="height"
          />
        </div>
        <div>
          <label htmlFor="width">Width</label>
          <input
            type="text"
            name="width"
            value={this.state.width}
            onChange={this.handleChange}
            id="width"
          />
        </div>
        <div>
          <label htmlFor="color">Color</label>
          <input
            type="text"
            name="color"
            value={this.state.color}
            onChange={this.handleChange}
            id="color"
          />
        </div>
        <button>Add New Box</button>
      </form>
    );
  }
}
