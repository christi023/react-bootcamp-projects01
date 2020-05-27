import React, { Component } from 'react';
import Ball from './Ball';
import './Lottery.css';

export default class Lottery extends Component {
  static defaultProps = {
    title: 'Lotto',
    numBalls: 6, //this is the amt of balls we want
    maxNum: 40, // max num of balls we want
  };
  constructor(props) {
    super(props);
    this.state = {
      nums: Array.from({ length: this.props.numBalls }), // this is equal to empty array
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // our generate function which will be called by our handleClick
  generate() {
    this.setState(curState => ({
      nums: curState.nums.map(n => Math.floor(Math.random() * this.props.maxNum) + 1), // our logic to give us 1 random number
    }));
  }

  //function method for our button, handleClick will call generate method
  handleClick() {
    this.generate();
  }

  render() {
    return (
      <section className="Lottery">
        <h1>{this.props.title}</h1>
        <div>
          {this.state.nums.map(n => (
            <Ball num={n} />
          ))}
        </div>
        <button onClick={this.handleClick}>Generate</button>
      </section>
    );
  }
}
