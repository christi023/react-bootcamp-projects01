import React, { Component } from 'react';
// style
import './Die.css';

export default class Die extends Component {
  static defaultProps = {
    numberWords: ['one', 'two', 'three', 'four', 'five', 'six'],
    val: 1,
  };
  constructor(props) {
    super(props);
    // binding
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.handleClick(this.props.idx);
  }
  render() {
    const { numberWords, locked, val, disabled, rolling } = this.props;
    let classes = `Die fas fa-dice-${numberWords[val - 1]} fa-4x`;
    if (locked) {
      classes += ' Die-locked';
    }
    if (rolling) {
      classes += ' Die-rolling';
    }
    return <i className={classes} onClick={this.handleClick} disabled={disabled} />;
  }
}
