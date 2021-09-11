import React from 'react';
import PlayStyles from './playButton.module.css'

const PlayButton = ({onClick}) => {


    return (
        <div className={PlayStyles.wrapper}>
          <a href="#" onClick={onClick}>
            <span>Start Bingo!</span>
          </a>
        </div>
    );
}

export default PlayButton;