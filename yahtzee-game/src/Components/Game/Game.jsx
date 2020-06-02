import React, { Component } from 'react';
// Components
import Dice from '../Dice/Dice';
import ScoreTable from '../ScoreTable/ScoreTable';
// styles
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      rolling: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined,
      },
    };
    // bindings
    this.roll = this.roll.bind(this);
    this.animateRoll = this.animateRoll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
  }

  componentDidMount() {
    this.animateRoll();
  }
  animateRoll() {
    this.setState({ rolling: true }, () => {
      setTimeout(this.roll, 1000);
    });
  }
  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState((st) => ({
      dice: st.dice.map((d, i) => (st.locked[i] ? d : Math.ceil(Math.random() * 6))),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      rolling: false,
    }));
  }

  // toggleLocked method
  toggleLocked(idx) {
    if (this.state.rollsLeft > 0 && !this.state.rolling) {
      // toggle whether index is in locked or not
      this.setState((st) => ({
        locked: [...st.locked.slice(0, idx), !st.locked[idx], ...st.locked.slice(idx + 1)],
      }));
    }
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rule name
    this.setState((st) => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
    }));
    this.animateRoll();
  }

  // displaying roll info
  displayRollInfo() {
    const messages = ['0 Rolls Left', '1 Roll Left', '2 Rolls Left', 'Starting Round'];
    return messages[this.state.rollsLeft];
  }

  render() {
    const { dice, locked, rollsLeft, rolling, scores } = this.state;
    return (
      <div className="Game">
        <header className="Game-header">
          <h1 className="App-title">Yahtzee!</h1>

          <section className="Game-dice-section">
            <Dice
              dice={dice}
              locked={locked}
              disabled={rollsLeft === 0}
              rolling={rolling}
              handleClick={this.toggleLocked}
            />
            <div className="Game-button-wrapper">
              <button
                className="Game-reroll"
                disabled={
                  this.state.locked.every((x) => x) ||
                  this.state.rollsLeft === 0 ||
                  this.state.rolling
                }
                onClick={this.animateRoll}
              >
                {this.displayRollInfo()}
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={scores} />
      </div>
    );
  }
}
