import './App.css';
import { useCallback, useEffect, useState } from 'react';

const App = () => {

  const [mouseDownTime, setMouseDownTime] = useState(0);
  const [mouseUpTime, setMouseUpTime] = useState(0);
  const [message, setMessage] = useState('');
  const [translatedMessage, setTranslatedMessage] = useState('');
  const [shouldKeyDown, setShouldKeyDown] = useState(true);

  const handleKeyUp = useCallback(e => {
    if(e.code ===  "Space") {
      handleMouseUp(e);
    }
  }, [setShouldKeyDown, shouldKeyDown, message])

  const handleKeyDown = useCallback(e => {
    setShouldKeyDown(() => false);
    if(e.code ===  "Space") {
      handleMouseDown(e);
    }
  }, [setShouldKeyDown, shouldKeyDown, message])

  useEffect(() => {
    if(shouldKeyDown) {
      document.addEventListener('keydown',handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup',handleKeyUp);
    }
  }, [shouldKeyDown, handleKeyDown])

  const handleMouseDown  = e => {
    
    const downTime = new Date().getTime();
    setMouseDownTime(downTime);
    const breakTime = downTime - mouseUpTime;

    if (breakTime > 2000 && breakTime < 4000) {
      setMessage(`${message} `);
    } else if (breakTime >= 4000) {
      setMessage(`${message}  `);
    }
  }

  const handleMouseUp = e => {
    setShouldKeyDown(() => true);
    const upTime = new Date().getTime();
    setMouseUpTime(upTime);
    const pressTime = upTime - mouseDownTime; 
   
    if(pressTime < 200) {
      setMessage(`${message}.`);
    } else if (pressTime >= 200) {
      setMessage(`${message}-`);
    }
  }

  const handleReset = () => {
    setMessage('');
    setTranslatedMessage('')
  }

  useEffect(() => {
    const ref = { 
      '.-': 'a',
      '-...': 'b',
      '-.-.': 'c',
      '-..': 'd',
      '.': 'e',
      '..-.': 'f',
      '--.': 'g',
      '....': 'h',
      '..': 'i',
      '.---': 'j',
      '-.-': 'k',
      '.-..': 'l',
      '--': 'm',
      '-.': 'n',
      '---': 'o',
      '.--.': 'p',
      '--.-': 'q',
      '.-.': 'r',
      '...': 's',
      '-': 't',
      '..-': 'u',
      '...-': 'v',
      '.--': 'w',
      '-..-': 'x',
      '-.--': 'y',
      '--..': 'z',
      '.----': '1',
      '..---': '2',
      '...--': '3',
      '....-': '4',
      '.....': '5',
      '-....': '6',
      '--...': '7',
      '---..': '8',
      '----.': '9',
      '-----': '0',
    };

    const newMessage = message.split('  ').map(a => a.split(' ').map(b => ref[b]).join('')).join(' ');
    setTranslatedMessage(newMessage);    

  }, [message])

  return (
    <div className="row">
      <button className='morse__button' onMouseDown={e => handleMouseDown(e)} onMouseUp={e => handleMouseUp(e)} title={'Klik'}></button>
      <p className='morse__code'>{`Kod Morse'a: ${message}`}</p>
      <p className='morse__translated'>{`Przetłumaczona wiadomość: ${translatedMessage}`}</p>
      <button className='morse__resetButton' title='Resetuj' onClick={handleReset}>Resetuj</button>
      <div className='morse__info'>
        <p className='morse__infoText'>Informacje:</p>
        <p className='morse__infoItem'>*Aby móc wstukiwać kolejny znak odczekaj przynajmniej 2 sekundy od ostatniego ruchu.</p>
        <p className='morse__infoItem'>*Aby móc wstukiwać kolejny wyraz odczekaj przynajmniej 4 sekundy od ostatniego ruchu.</p>
      </div>
    </div>
  );
}

export default App;
