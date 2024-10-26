import React, { useState } from 'react';
import confetti from 'canvas-confetti'; 

const FindTheKing = () => {
    const [cards, setCards] = useState(shuffleCards());
    const [flipped, setFlipped] = useState([false, false, false]);
    const [message, setMessage] = useState('');
    const [gameOver, setGameOver] = useState(false);
  
    // Shuffle the cards (2 blanks, 1 King)
    function shuffleCards() {
      const cardDeck = ['King', 'Blank', 'Blank'];
      return cardDeck.sort(() => Math.random() - 0.5); // Random shuffle
    }
  
    // Trigger confetti effect
    const triggerConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#bb0000', '#ffffff', '#ffd700'], // Red, white, and gold
      });
    };
  
    // Handle card click
    const handleCardClick = (index) => {
      if (!gameOver) {
        const newFlipped = flipped.map((flip, i) => (i === index ? true : flip));
        setFlipped(newFlipped);
  
        if (cards[index] === 'King') {
          setMessage('🎉 Congratulations! You found the King!');
          setGameOver(true);
          triggerConfetti(); // Trigger confetti when King is found
        } else {
          setMessage('❌ Wrong guess! Try again.');
        }
      }
    };
  
    // Restart the game
    const restartGame = () => {
      setCards(shuffleCards());
      setFlipped([false, false, false]);
      setMessage('');
      setGameOver(false);
    };
  
    return (
      <div className="game-container">
        <h1>Find the King</h1>
        <div className="card-container">
          {cards.map((card, index) => (
    <div
      key={index}
      className={`card ${flipped[index] ? 'flipped' : ''}`}
      onClick={() => handleCardClick(index)}
    >
      <div className="card-inner">
        <div className="card-front">🤫?</div>
        <div
          className={`card-back ${card === 'King' ? 'king-card' : ''}`}
        >
          {card === 'King' ? (
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwh5S7GfT2O-mZM03t7dnHwvTtorA9s8egfA&s" 
              alt="King Card"
              className="king-image"
            />
          ) : (
            <span>{card}</span>
          )}
        </div>
      </div>
    </div>
  ))}
  
        </div>
        <p className="message">{message}</p>
        {gameOver && (
          <button onClick={restartGame} className="restart-button">
            Play Again
          </button>
        )}
      </div>
    );
  };

export default FindTheKing
