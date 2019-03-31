import React, { Component } from 'react';


class CryptoList extends Component {


    render() {
        const coins = this.props.coins;
        return (
            <ul>
                {coins.map(cur =>
                    <li key={cur.cur}>Last: rate: <span className={cur.class}>{cur.last} {cur.arrow}</span>
                        <strong>{cur.cur}</strong>
                        <span>{cur.symbol}</span> 
                    </li>
                )}
            </ul>
        );
    }
}

export default CryptoList;