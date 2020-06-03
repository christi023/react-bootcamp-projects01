import React, { Component } from 'react';
// Component
import Card from '../Card/Card';
//axios
import axios from 'axios';
// styles
import './Deck.css';

// deck of cards url
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawn: [],
    };

    // bindings
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    // making the request => fetching with axios
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({ deck: deck.data });
  }

  // getCard method
  async getCard() {
    let id = this.state.deck.deck_id;
    // make request using deck id
    try {
      let cardUrl = `${API_BASE_URL}/${id}/draw/`;

      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error('No card remaining');
      }
      //console.log(cardRes.data);
      let card = cardRes.data.cards[0];
      // setState using new card info from api
      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`,
          },
        ],
      }));
    } catch (err) {
      alert(err);
    }
  }

  render() {
    const cards = this.state.drawn.map((card) => (
      <Card key={card.id} name={card.name} image={card.image} />
    ));
    return (
      <div className="Deck">
        <h1 className="Deck-title">♦ Card Dealer ♦</h1>
        <h2 className="Deck-title subtitle">♦ A little card demo made with React ♦</h2>
        <button className="Deck-btn" onClick={this.getCard}>
          Get Card!{' '}
        </button>
        <div className="Deck-card-area"> {cards}</div>
      </div>
    );
  }
}
