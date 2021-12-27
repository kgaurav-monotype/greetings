import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Arrow from './Arrow';

import logo from '../images/small-m.gif';
import artwork from '../images/bg.png';

import logo2 from '../images/Red-Sox.png';
import artwork2 from '../images/sox-anim.gif';

import Card from './Card';
import Card2 from './Card2';


export default function CardList() {

    const [msg] = useState("To a Brighter Futura.");
    const [msg2] = useState("Stay Home and enjoy Christmas");

    return (
            <div className="container">
                <header>
                    <Link to="/"><Arrow /></Link>
                    <div className='page-heading'>
                        <h2 className="heading-sm">Season’s Greetings</h2>
                        <p className="desc-sm">Style your message</p>
                    </div>
                </header>
                <div className='card-container'>
                    <Card editUrl="/edit-card" changeText={true} logo={logo} artwork={artwork} text={msg} showLogo={true}/>
                    <Card2 editUrl="/edit-card" changeText={true} logo={logo2} artwork={artwork2} text={msg2} showLogo={true}/>
                </div>
            </div>
    )
}