import React from 'react'
import { Link } from "react-router-dom";

import { Player, Controls } from '@lottiefiles/react-lottie-player';
import EmailAnimation from '../lottie/email-animation.json';

export default function Splash() {

    return (
        <div className="container splash">
            <Player autoplay loop src={EmailAnimation}
            style={{ height: '300px', width: '300px' }}>
            <Controls visible={false} />
            </Player>
            <h2 className="heading">Season’s Greetings</h2>
            <p className="desc">Send some holiday cheer with Monotype.</p>
            <Link to="/card-list" className="btn">Start</Link>
        </div>
    )
}
