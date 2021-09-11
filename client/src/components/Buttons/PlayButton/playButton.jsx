import React from 'react';
import PlayStyles from './playButton.module.css'

const PlayButton = () => {

    return (
        <div className={PlayStyles.wrapper}>
          <a href="#">
            <span>Start Bingo!</span>
          </a>
        </div>
    );
}