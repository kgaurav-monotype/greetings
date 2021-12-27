import React from 'react'
import { Link } from "react-router-dom";

import Edit from './Edit';

export default function Card2({logo, artwork, text, changeText, editUrl, showLogo}) {
    return (
            <div className="card2">
                <Link to={editUrl}>
                    <div className="inner">
                    {showLogo? <img className="logo" src={logo} alt="" />: null}
                        <div className="text">{text}</div>
                        <img className="artwork" src={artwork} alt="" />
                    </div>
                    {
                        changeText && <span className='edit-text'>Customise &nbsp;<Edit/></span>
                    }
                </Link>
            </div>

    )
}
