import React, { useState } from 'react';
import './App.css';

function App() {
  const audio = new Audio('http://adobewordpress.com/tasarim/include/gold-sound.mp3');

  const [coinClasses, setCoinClasses] = useState('coin');

  const play = () => {
    audio.play();
    setCoinClasses('coin play');
    setTimeout(() => setCoinClasses('coin'), 500)

  }

  let socket = new WebSocket("ws://localhost:3000/echo");
  socket.onmessage = function (event) {
    play();
  };

  socket.onerror = (error) => {
    play();
  };

  return (
    <div onClick={play} class="mario">
      <div class="box">
        <span className={coinClasses}><img src="http://adobewordpress.com/tasarim/images/coin.png" /> </span>
      </div>
    </div>
  );
}

export default App;
