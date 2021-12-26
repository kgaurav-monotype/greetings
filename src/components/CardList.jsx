import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Arrow from './Arrow';

import logo from '../images/M-logo.jpg';
import artwork from '../images/bg.png';
import Card from './Card';


export default function CardList() {

    const [msg] = useState("To a Brighter Futura.");

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
                    <Card editUrl="/edit-card" changeText={true} logo={logo} artwork={artwork} text={msg}/>
                </div>
            </div>
    )
}