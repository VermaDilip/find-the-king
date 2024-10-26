// import React, { useState } from 'react';
// import confetti from 'canvas-confetti'; 

// const FindTheKing = () => {
//     const [cards, setCards] = useState(shuffleCards());
//     const [flipped, setFlipped] = useState([false, false, false]);
//     const [message, setMessage] = useState('');
//     const [gameOver, setGameOver] = useState(false);
  
//     // Shuffle the cards (2 blanks, 1 King)
//     function shuffleCards() {
//       const cardDeck = ['King', 'Blank', 'Blank'];
//       return cardDeck.sort(() => Math.random() - 0.5); // Random shuffle
//     }
  
//     // Trigger confetti effect
//     const triggerConfetti = () => {
//       confetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 },
//         colors: ['#bb0000', '#ffffff', '#ffd700'], // Red, white, and gold
//       });
//     };
  
//     // Handle card click
//     const handleCardClick = (index) => {
//       if (!gameOver) {
//         const newFlipped = flipped.map((flip, i) => (i === index ? true : flip));
//         setFlipped(newFlipped);
  
//         if (cards[index] === 'King') {
//           setMessage('🎉 Congratulations! You found the King!');
//           setGameOver(true);
//           triggerConfetti(); // Trigger confetti when King is found
//         } else {
//           setMessage('❌ Wrong guess! Try again.');
//         }
//       }
//     };
  
//     // Restart the game
//     const restartGame = () => {
//       setCards(shuffleCards());
//       setFlipped([false, false, false]);
//       setMessage('');
//       setGameOver(false);
//     };
  
//     return (
//       <div className="game-container">
//          <h1>Find the King 👑</h1>
//         <div className="card-container">
//           {cards.map((card, index) => (
//     <div
//       key={index}
//       className={`card ${flipped[index] ? 'flipped' : ''}`}
//       onClick={() => handleCardClick(index)}
//     >
//       <div className="card-inner">
//         <div className="card-front">🤫?</div>
//         <div
//           className={`card-back ${card === 'King' ? 'king-card' : ''}`}
//         >
//           {card === 'King' ? (
//             <img 
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwh5S7GfT2O-mZM03t7dnHwvTtorA9s8egfA&s" 
//               alt="King Card"
//               className="king-image"
//             />
//           ) : (
//             <span>{card}</span>
//           )}
//         </div>
//       </div>
//     </div>
//   ))}
  
//         </div>
//         <p className="message">{message}</p>
//         {gameOver && (
//           <button onClick={restartGame} className="restart-button">
//             Play Again
//           </button>
//         )}
//       </div>
//     );
//   };

// export default FindTheKing

//more advance


import React, { useState } from 'react';
import confetti from 'canvas-confetti';


const FindTheKing = () => {
  const [cards, setCards] = useState(shuffleCards());
  const [flipped, setFlipped] = useState([false, false, false]);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [money, setMoney] = useState(0);
  const [isDeposited, setIsDeposited] = useState(false);

  const [accountNumber, setAccountNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');

  function shuffleCards() {
    const cardDeck = ['King', 'Blank', 'Blank'];
    return cardDeck.sort(() => Math.random() - 0.5);
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#bb0000', '#ffffff', '#ffd700'],
    });
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    const depositAmount = 100;
    setMoney(depositAmount);
    setIsDeposited(true);

    const paymentDetails = {
      accountNumber,
      cardNumber,
      cvv,
      balance: depositAmount,
    };
    localStorage.setItem('userPaymentDetails', JSON.stringify(paymentDetails));

    setMessage('Deposit successful! Start playing.');
  };

  const handleCardClick = (index) => {
    if (!gameOver && money >= 20) {
      const newFlipped = flipped.map((flip, i) => (i === index ? true : flip));
      setFlipped(newFlipped);
      setMoney((prevMoney) => prevMoney - 20);

      if (cards[index] === 'King') {
        setMessage('🎉 Congratulations! You found the King! +₹40!');
        setMoney((prevMoney) => prevMoney + 40);
        setGameOver(true);
        triggerConfetti();
      } else {
        setMessage('❌ Wrong guess! Try again.');
      }
    } else if (money < 20) {
      setMessage('❌ Not enough money to make a guess!');
    }
  };

  const restartGame = () => {
    setCards(shuffleCards());
    setFlipped([false, false, false]);
    setMessage('');
    setGameOver(false);
  };

  return (
    <div className="game-container">
      {!isDeposited ? (
        <div className="atm-card-container">
          <form onSubmit={handleDeposit} className="atm-card-form">
            <h2 className="form-title">💳 Deposit Money</h2>
            <div className="form-field">
              <label>Account Number:</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
                placeholder="1234 5678 9123"
              />
            </div>
            <div className="form-field">
              <label>Card Number:</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                placeholder="XXXX XXXX XXXX XXXX"
              />
            </div>
            <div className="form-field">
              <label>CVV:</label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
                placeholder="XXX"
              />
            </div>
            <button type="submit" className="deposit-button">
              Deposit ₹100
            </button>
          </form>
        </div>
      ) : (
        <>
          <h1>Find the King 👑</h1>
          <h2>Balance: ₹{money}</h2>
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
        </>
      )}
    </div>
  );
};

export default FindTheKing;
