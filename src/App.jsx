import React, { useState, useEffect } from 'react';
import coinImage from './assets/coin.png';
import frogImage from './assets/frog.png';
import lizardImage from './assets/lizzard.png';
import './App.css';

const App = () => {
  const [score, setScore] = useState(() => Number(localStorage.getItem('score')) || 0);
  const [image, setImage] = useState(frogImage);
  const [plusOnes, setPlusOnes] = useState([]);

  useEffect(() => {
    localStorage.setItem('score', score);
    if (score >= 50) {
      setImage(lizardImage);
    }
  }, [score]);

  const handleClick = (event) => {
    setScore(score + 1);

    const rect = event.currentTarget.getBoundingClientRect();
    const plusOneId = Date.now();
    setPlusOnes([...plusOnes, { id: plusOneId, left: event.clientX - rect.left, top: event.clientY - rect.top }]);

    setTimeout(() => {
      setPlusOnes((prevPlusOnes) => prevPlusOnes.filter((plusOne) => plusOne.id !== plusOneId));
    }, 2000);
  };

  return (
    <div className="game">
      <div className="header">
        <img src={coinImage} alt="coin" />
        <h2 className="score">{score}</h2>
      </div>
      <div className="circle" onClick={handleClick}>
        <img id="circle" src={image} alt="frog" className="clickable" />
        {plusOnes.map((plusOne) => (
          <div
            key={plusOne.id}
            className="plus-one"
            style={{ left: `${plusOne.left}px`, top: `${plusOne.top}px` }}
          >
            +1
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
