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

  const updateMessage = (e) => {
    setMsg(e.target.value);
  }

  const selectMessage = (e) => {
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
        // title: 'Greetings from Monotype',
        // text: 'Merry Christmas.',
      })
        .then(() => console.log('Share was successful.'))
        .catch((error) => console.log('Sharing failed', error)).finally(() => {
        setFinalGif(null);
      });
    } else {
      console.log(`Your system doesn't support sharing files.`);
      setFinalGif(null);
    }
  }

  async function prepare() {
    setDisable(true);

    const { devicePixelRatio } = window;
    const logoGif = document.querySelector('.logo');
    const gifUrl = logoGif.getAttribute('src');
    const logoWidth = logoGif.clientWidth;
    const logoHeight = logoGif.clientHeight;
    const promisedGif = await fetch(gifUrl)
      .then(resp => resp.arrayBuffer())
      .then(buff => parseGIF(buff))
      .then(gif => decompressFrames(gif, true));

    const content = document.getElementById('canvas');
    let canvas = await html2canvas(content, {
      backgroundColor: null,
      // scale: 2, window.devicePixelRatio
    });
    let dataUrl = canvas.toDataURL();
    let blob = await (await fetch(dataUrl)).blob();

    const gif = new window.GIF({
      workers: 4,
      quality: 2
    });
    const ctx = canvas.getContext("2d");
    const nCanvas = document.createElement("canvas");
    const nCtx = nCanvas.getContext("2d");

    for (let i = 0; i < promisedGif.length; i++) {
      nCtx.putImageData(new ImageData(promisedGif[i].patch, 24, 24), 0, 0);
      ctx.putImageData(nCtx.getImageData(0, 0, 24, 24), 36, 0);
      nCtx.clearRect(0, 0, 24, 24);
      gif.addFrame(canvas, {delay: 16 * i, copy: true});
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
        </div>
      </header>
      <div id="canvasShown">
        <Card2 editUrl="/edit-card2" logo={logo} artwork={artwork} text={msg} showLogo={true}/>
      </div>
      <div id="canvas" style={{position: "absolute", left: "-1000px", top: "-1000px"}}>
        <Card2 editUrl="/edit-card2" logo={logo} artwork={artwork} text={msg} showLogo={false}/>
      </div>
      <textarea autoFocus={true} maxLength="60" className='text-box' type="text" onChange={updateMessage}
                onClick={selectMessage} value={msg} name="text" aria-label='text' cols="30" rows="5"></textarea>
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