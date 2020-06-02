import React, { Component } from 'react';
//styles
import './RuleRow.css';

export default class RuleRow extends Component {
  render() {
    const { score, name, doScore, description } = this.props;
    const disabled = score !== undefined;
    return (
      <tr
        className={`RuleRow RuleRow-${disabled ? 'disabled' : 'active'}`}
        onClick={disabled ? null : doScore}
      >
        <td className="RuleRow-name">{name}</td>
        <td className="RuleRow-score">{disabled ? score : description}</td>
      </tr>
    );
  }
}
