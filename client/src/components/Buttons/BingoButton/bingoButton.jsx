import React from 'react';
import './bingoStyles.css';

const BingoButton = ({onBingo}) => {
    var animateButton = function (e) {
        onBingo(e);
        e.target.classList.add('animate');
        setTimeout(function () {
            e.target.classList.remove('animate');
        }, 700);
    };

    return (
        <button className="bubbly-button" onClick={animateButton}>Bingo</button>
    )
}
export default BingoButton;