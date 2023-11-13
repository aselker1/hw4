import React, { useState, useEffect } from 'react';


function App() {
  const [time, setTime] = useState(0);
  const [aos, setAos] = useState(false);
  const [milliseconds, setMilliseconds] = useState(0);

  useEffect(() => {
    let timer;
    if (aos) {
      timer = setTimeout(() => {
        setMilliseconds((ms) => {
          if (ms + 100 >= 1000) {
            setTime((s) => s + 1);
            return 0;
          }
          return ms + 100;
        });
      }, 100);
    } else {
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [aos, milliseconds]);

  const start = () => {
    setAos(true);
  };

  const pause = () => {
    setAos((aos) => !aos);
  };

  const reset = () => {
    setTime(0);
    setMilliseconds(0);
    setAos(false);
  };

  const formatTime = (totalSeconds, ms) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const deciseconds = Math.floor(ms / 100);
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const paddedDeciseconds = deciseconds < 10 ? `0${deciseconds}` : deciseconds;
    return `${minutes}:${paddedSeconds}.${paddedDeciseconds}`;
  };

  return (
    <div className="App">
      
      <h1>{formatTime(time, milliseconds)}</h1>
      <div className='btns'>
        <button id="start" onClick={start}>Start</button>
        <button id="pause" onClick={pause}>Pause</button>
        <button id="reset" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;