import React from 'react';
import PlayStyles from './playButton.module.css'

const PlayButton = ({onClick}) => {


    return (
        <div className={PlayStyles.wrapperes}>
          <a className={PlayStyles.anchor} href="#" onClick={onClick}>
            <span>Start Bingo!</span>
          </a>
        </div>
    );
}

export default PlayButton;