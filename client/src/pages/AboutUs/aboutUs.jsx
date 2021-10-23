import React from 'react';
import './styles.css';

const AboutUs = () => {
    return (
        <div className='aboutPage'>
            <h2>About Binod Bingo</h2>
            <p>Binod Bingo website is game made for fun. Come play bingo and feel high af.An experience to be remembered
                 forever.Play with friends.Happy Playing:). Join the room with your friends or family members 
                 and play this excited game and see the leaderboard and your statistics with your opponents which are represented
                 in Pie chart, Bar chart and Donut chart.</p>
             <h4>Technologies Used</h4>
             <p>Our core aim has always been to provide amazing free bingo cards to 
                 anyone organizing a small bingo game. This means that school teachers, families,
                  friends, small clubs and community groups can all enjoy a fun game of bingo completely free.
                 <br/>Technolgies which we used are:-
                 <uL className='techUl'>
                     <li>React Js</li>
                     <li>Express Js</li>
                     <li>Node Js</li>
                     <li>Mongo Db</li>
                     <li>Redux</li>
                     <li>Socket.io</li>
                     <li>React Material UI</li>
                     <li>React ChartJs Library</li>
                 </uL> </p>
             <h4>What's the catch?</h4>
             <p>There is no catch. Our bingo games are totally free. You just need to create an account. There are no ads.
                Due to demand for bigger games we offer simple, and free Bingo game.</p>
             <h4>Credits</h4>
             <p>Made by Rohit Bhalla and Raghav Gupta</p>             
        </div>
    );
}

export default AboutUs;