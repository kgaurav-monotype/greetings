import React, {useState} from 'react';
import html2canvas from 'html2canvas';
import {Link} from "react-router-dom";
import {decompressFrames, parseGIF} from 'gifuct-js';
import { getImgFromArr } from 'array-to-image';

import Arrow from './Arrow';
import logo from '../images/Red-Sox.png';
import artwork from '../images/sox-anim.gif';

import Card2 from './Card2';

export default function EditCard2(node, child) {
  const [msg, setMsg] = useState("Stay Home and enjoy Christmas");
  const [finalGif, setFinalGif] = useState(null);
  const [disable, setDisable] = useState(false);
  const [selectedOnce, setSelectedOnce] = useState(false);
  const [charsUsed, setCharsUsed] = useState(false);
  const [shareApiError, setShareApiError] = useState(false);
  const [origFontSize, setOrigFontSize] = useState(null);

  const updateMessage = (e) => {
    const displayText = document.querySelector('#canvasShown div.text')

    if (finalGif) {
      setFinalGif(null);
    }

    if (origFontSize === null) {
      const style = window.getComputedStyle(displayText, null).getPropertyValue('font-size');
      const fontSize = parseFloat(style);

      setOrigFontSize(fontSize);
    }

    if (origFontSize && e.target.value.length <= 30) {
      displayText.style.fontSize = origFontSize+'px';
    }

    // if (origFontSize && e.target.value.length < 40 && e.target.value.length > 20) {
    //   displayText.style.fontSize = origFontSize*0.75+'px';
    // }

    if (origFontSize && e.target.value.length > 30) {
      displayText.style.fontSize = origFontSize*0.75+'px';
    }

    if (e.target.value.length > 60) {
      e.target.value = e.target.value.substring(0, 60);

      setMsg(e.target.value);
      setCharsUsed(e.target.value.length);

      return;
    }

    setMsg(e.target.value);

    setCharsUsed(e.target.value.length);
  }

  const selectMessage = (e) => {
    if (selectedOnce) {
      return;
    }

    setSelectedOnce(true);
    e.target.select();
  }

  function share() {
    if (finalGif === null) {
      return;
    }

    const filesArray = [
      // new File([blob], 'greeting.png', {type: 'image/png', lastModified: new Date().getTime()}),
      new File([finalGif], 'greeting.gif', {type: 'image/gif', lastModified: new Date().getTime()})
    ];

    if (navigator.canShare && navigator.canShare({files: filesArray})) {
      navigator.share({
        files: filesArray,
        title: 'Greetings from Monotype',
        text: 'Share joy via https://greetings-m.web.app/',
      }).then(() => console.log('Share was successful.'))
        .catch((error) => {
          console.log('Sharing failed', error);
          setShareApiError(true);
        });
    } else {
      console.log(`Your system doesn't support sharing files.`);
      setShareApiError(true);
      setFinalGif(null);
    }
  }

  async function prepare() {
    setDisable(true);

    const { devicePixelRatio } = window;
    const logoGif = document.querySelector('.artwork');
    const gifUrl = logoGif.getAttribute('src');
    const logoWidth = logoGif.clientWidth;
    const logoHeight = logoGif.clientHeight;
    const promisedGif = await fetch(gifUrl)
      .then(resp => resp.arrayBuffer())
      .then(buff => parseGIF(buff))
      .then(gif => decompressFrames(gif, true));

    const content = document.getElementById('canvas');
    let canvasHtml = await html2canvas(content, {
      backgroundColor: null,
      // scale: 2, window.devicePixelRatio
    });
    let dataUrl = canvasHtml.toDataURL();
    let blob = await (await fetch(dataUrl)).blob();

    const gif = new window.GIF({
      workers: 4,
      quality: 10
    });
    // const ctxHtml = canvasHtml.getContext("2d");
    const canvas = document.createElement('canvas');
    canvas.width = canvasHtml.width;
    canvas.height = canvasHtml.height;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(canvasHtml, 0, 0, canvasHtml.width, canvasHtml.height)

    const nCan = document.createElement('canvas');
    nCan.width = 81;
    nCan.height = 81;

    const nCtx = nCan.getContext("2d");

    const parentPos = document.querySelector('.card2').getBoundingClientRect();
    const child = document.querySelector('.artwork');
    const relativePos = {};

    relativePos.left = (devicePixelRatio*parentPos.width/2 - child.width);
    // relativePos.left = (devicePixelRatio*parentPos.width/2);
    relativePos.top = (parentPos.height*devicePixelRatio - child.height*devicePixelRatio);
    // ctx.globalAlpha = 1.0;

    for (let i = 0; i < promisedGif.length; i++) {
      nCtx.putImageData(new ImageData(promisedGif[i].patch, 81, 81), 0, 0);
      // ctx.putImageData(nCtx.getImageData(0, 0, 81, 81), relativePos.left, relativePos.top);
      ctx.drawImage(canvasHtml, 0, 0);
      ctx.drawImage(nCan, 0, 0, 81, 81, relativePos.left, relativePos.top, 81*devicePixelRatio, 81*devicePixelRatio);
      gif.addFrame(canvas, {delay: 60/promisedGif.length * i, copy: true});

      nCtx.clearRect(0, 0, 81, 81);
    }

    // document.body.appendChild(canvas);

    const valueReturned = await new Promise((resolve) => {
      gif.on('finished', function (b) {
        // window.open(URL.createObjectURL(b));
        // return;

        console.log('finished gif encoding');
        setDisable(false);
        resolve(b);
      });

      gif.render();
    });

    setFinalGif(valueReturned);
  }

  return (
    <div className="container">
      <header>
        <Link to="/card-list"><Arrow/></Link>
        <div className='page-heading'>
          <h2 className="heading-sm">Season’s Greetings</h2>
          <p className="desc-sm">Style your message</p>
          <span style={{display: shareApiError ? 'block' : 'none' }}>Sharing not supported on your browser. Please update to the latest version</span>
        </div>
      </header>
      <div id="canvasShown">
        <Card2 editUrl="/edit-card2" logo={logo} artwork={artwork} text={msg} showLogo={true}/>
      </div>
      <div id="canvas" style={{position: "absolute", left: "-1000px", top: "-1000px"}}>
        <Card2 editUrl="/edit-card2" logo={logo} artwork={artwork} text={msg} showLogo={false}/>
      </div>
      <div className="editArea">
      <textarea autoFocus={true} maxLength="60" className='text-box' type="text" onChange={updateMessage} onBlur={updateMessage}
                onClick={selectMessage} value={msg} name="text" aria-label='text' cols="30" rows="5"></textarea>

      {charsUsed? <div id="charlimit">{charsUsed}/60</div>: null}
      </div>

      {!finalGif ? <button disabled={disable} className="btn btn-block" onClick={prepare}>Prepare {disable ? <div className="loader"></div> : null}</button> : <button className="btn btn-block" onClick={share}>Share</button>}
    </div>
  );
}

// const img = getImgFromArr(promisedGif[i].patch);
//
// nCtx.drawImage(img, 0, 0,
//   img.width * devicePixelRatio,
//   img.height * devicePixelRatio);
// ctx.putImageData(nCtx.getImageData(0, 0, logoWidth*devicePixelRatio, logoHeight*devicePixelRatio), 36, 0);
// gif.addFrame(canvas, {delay: 16 * i, copy: true});
// nCtx.clearRect(0, 0, logoWidth*devicePixelRatio, logoHeight*devicePixelRatio);

// const removeBlack = function(imageData) {
//   const data = imageData.data;
//   for (let i = 0; i < data.length; i += 4) {
//     const d = data[i]+ data[i + 1] + data[i + 2];

//     if(d < 10){
//         console.log('making transparent');
//         data[i + 3] = 0; // alpha
//     }
//   }
// };
