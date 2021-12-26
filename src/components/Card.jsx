import React from 'react'
import { Link } from "react-router-dom";

import Edit from './Edit';

export default function Card({logo, artwork, text, changeText, editUrl}) {
    return (
            <div className="card">
                <Link to={editUrl}>
                    <img className="logo" src={logo} alt="" />
                    <div className="text">{text}</div>
                    <img className="artwork" src={artwork} alt="" />
                    {
                    changeText && <span className='edit-text'>Customise &nbsp;<Edit/></span>
                    
                    }
                </Link>
            </div>
        
    )
}
