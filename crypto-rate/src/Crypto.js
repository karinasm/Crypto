import React, { Component } from 'react';
import axios from 'axios';
import './Crypto.css';
import CryptoList from './CrytpoList';

class Crypto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
    }
  }
  componentDidMount() {
    setInterval(() => {
      if(this.inputValue.value===""){
        this.fechData();
      }
    }, 5000);
    this.fechData();
  }
  fechData = () => {
    axios.get('https://blockchain.info/pl/ticker')
      .then(response => {
        let coins = [];
        let oldCoins = this.state.coins;
        // tworzenie listy z obiektu
        for (let key in response.data) {
          let newRate = {
            cur: key,
            last: response.data[key].last,
            symbol: response.data[key].symbol,

            // cur: key,
            // ...response.data[key] to wtedy wszystkie się wyświetlają 
          }

          let oldRate = oldCoins.find(oldRate => oldRate.cur === newRate.cur);

          if (oldRate !== undefined) {
            if (newRate.last > oldRate.last) {
              newRate.class = 'green';
              newRate.arrow = String.fromCharCode(8593);
            } else if (newRate.last < oldRate.last) {
              newRate.class = 'red';
              newRate.arrow = String.fromCharCode(8595);
            } else if (newRate.last === oldRate.last) {
              newRate.class = 'blue';
              newRate.arrow = String.fromCharCode(8596);
            }
          } else {
            newRate.class = 'blue';
            newRate.arrow = String.fromCharCode(8596);
          }
          coins.push(newRate);
        }
        this.setState({ coins });
      })
  }
  onFilter = () => {
    let filter = this.inputValue.value.trim().toUpperCase(); //brak spacji
    let coinsFilter = this.state.coins;
    coinsFilter = coinsFilter.filter(rate => {
      return rate.cur.includes(filter);
    });

    this.setState({ coins: coinsFilter });
  }

  render() {
    // console.log(this.state.coins)
    return (
      <div className="Crypto">
        <div className="header">
          <i class="fab fa-bitcoin fa-10x"></i>
          <h1>Crypto Rate</h1>
        </div>
        <input type="text" placeholder="Filter" ref={input => this.inputValue = input} onChange={this.onFilter}
        />
        {/* przekazywanie propsów to na dole */}
        <CryptoList coins={this.state.coins} />
      </div>
    )
  }
}
export default Crypto;