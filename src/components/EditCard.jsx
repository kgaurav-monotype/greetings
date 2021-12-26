import React, {useState} from 'react';
import html2canvas from 'html2canvas';

import { Link } from "react-router-dom";
import Arrow from './Arrow';

import logo from '../images/M-logo.jpg';
import artwork from '../images/bg.png';

import Card from './Card';

export default function EditCard() {

    const [msg, setMsg] = useState("To a Brighter Futura.");

    const updateMessage = (e)=>{
        setMsg(e.target.value); 
    }

    const selectMessage = (e)=>{
        e.target.select(); 
    }

    async function share() {
        const content = document.getElementById('canvas');
        const canvas = await html2canvas(content, {
            backgroundColor: null,
        });

        const dataUrl = canvas.toDataURL();
        const blob = await (await fetch(dataUrl)).blob();

        const filesArray = [new File([blob], 'greeting.png', { type: 'image/png', lastModified: new Date().getTime() })];

        if (navigator.canShare && navigator.canShare({ files: filesArray })) {
            navigator.share({
                files: filesArray,
                // title: 'Greetings from Monotype',
                // text: 'Merry Christmas.',
            })
                .then(() => console.log('Share was successful.'))
                .catch((error) => console.log('Sharing failed', error));
        } else {
            console.log(`Your system doesn't support sharing files.`);
        }
    }

    return (

<div className="container">
            <header>
                <Link to="/"><Arrow /></Link>
                <div className='page-heading'>
                    <h2 className="heading-sm">Season’s Greetings</h2>
                    <p className="desc-sm">Style your message</p>
                </div>
            </header>
            <div id="canvas">
                <Card editUrl="/edit-card" logo={logo} artwork={artwork} text={msg}/>
            </div>
            <textarea maxLength="50" className='text-box' type="text" onChange={updateMessage} onClick={selectMessage} value={msg} name="text" aria-label='text'  cols="30" rows="5"></textarea>
            <button className="btn btn-block" onClick={share}>Send</button>
        </div>
    );
}
