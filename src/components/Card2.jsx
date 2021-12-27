import React from 'react'
import { Link } from "react-router-dom";

import { Player, Controls } from '@lottiefiles/react-lottie-player';
import SocksAnimation from '../lottie/socks-anim.json';

import Edit from './Edit';

export default function Card2({logo, text, changeText, editUrl, showLogo}) {
    return (
            <div className="card2">
                <Link to={editUrl}>
                    <div className="inner">
                    {showLogo? <img className="logo" src={logo} alt="" />: null}
                        <div className="text">{text}</div>
                        <Player className="artwork" autoplay loop src={SocksAnimation}
                        style={{ height: '80px', width: '80px' }}>
                        <Controls visible={false} />
                        </Player>
                    </div>
                    {
                        changeText && <span className='edit-text'>Customise &nbsp;<Edit/></span>
                    }
                </Link>
            </div>

    )
}
