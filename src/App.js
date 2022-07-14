import {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [buttonColor, setButtonColor] = useState('red');
  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red'; 
  const [disabled, setDisabled] = useState(false);

  return (
    <div>
      <button 
        style={{backgroundColor: buttonColor}} 
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}
      >
      Change to {newButtonColor}
      </button>
      <input 
        type="checkbox"
        onClick={() => setDisabled(!disabled)}
      /> 
    </div>
  );
}

export default App;
