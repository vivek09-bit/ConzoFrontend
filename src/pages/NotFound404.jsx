import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Game constants
const GAME_WIDTH = 350;
const GAME_HEIGHT = 420;
const PLAYER_WIDTH = 48;
const PLAYER_HEIGHT = 48;
const DOT_SIZE = 32;
const MOVE_STEP = 32;
const DOT_FALL_SPEED = 4;

function randomX() {
  return Math.random() * (GAME_WIDTH - DOT_SIZE);
}

// Animated background stars
function StarsBG({ count = 40 }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-70"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `star-twinkle ${2 + Math.random() * 2}s infinite alternate`,
          }}
        />
      ))}
      <style>
        {`
          @keyframes star-twinkle {
            from { opacity: 0.5; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

function NotFoundGame() {
  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
  const [dotY, setDotY] = useState(0);
  const [dotX, setDotX] = useState(randomX());
  const [dotBounce, setDotBounce] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const animationRef = useRef();

  // Handle player movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      if (e.key === "ArrowLeft") {
        setPlayerX((x) => Math.max(0, x - MOVE_STEP));
      } else if (e.key === "ArrowRight") {
        setPlayerX((x) => Math.min(GAME_WIDTH - PLAYER_WIDTH, x + MOVE_STEP));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver]);

  // Game loop with dot bounce
  useEffect(() => {
    if (gameOver) return;
    let bounce = 0;
    const animate = () => {
      setDotY((y) => {
        if (y + DOT_SIZE >= GAME_HEIGHT - PLAYER_HEIGHT - 10) {
          // Check collision
          if (
            dotX + DOT_SIZE > playerX &&
            dotX < playerX + PLAYER_WIDTH
          ) {
            setScore((s) => s + 1);
            setDotX(randomX());
            setDotY(0);
            return 0;
          } else {
            setGameOver(true);
            return y;
          }
        }
        return y + DOT_FALL_SPEED;
      });
      // Animate dot bounce
      bounce += 0.2;
      setDotBounce(Math.sin(bounce) * 6);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
    // eslint-disable-next-line
  }, [dotX, playerX, gameOver]);

  // Restart game
  const restart = () => {
    setScore(0);
    setGameOver(false);
    setPlayerX(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
    setDotY(0);
    setDotX(randomX());
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-black overflow-hidden">
      <StarsBG />
      <div className="z-10 flex flex-col items-center">
        <h1
          className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-indigo-400 drop-shadow-lg mb-2"
          style={{ fontFamily: "'Orbitron', 'Segoe UI', Arial, sans-serif" }}
        >
          404
        </h1>
        <p className="text-2xl text-white font-bold mb-4 tracking-wider" style={{ fontFamily: "'Orbitron', 'Segoe UI', Arial, sans-serif" }}>
          Lost in Space!
        </p>
        <div className="mb-4 text-indigo-200 font-semibold text-lg">
          Play the game while you find your way home.
        </div>
        <div
          className="relative bg-gradient-to-br from-indigo-800 via-blue-800 to-indigo-900 rounded-2xl shadow-2xl border-2 border-indigo-400"
          style={{
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            overflow: "hidden",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          }}
        >
          {/* Falling Dot (animated bounce) */}
          <div
            style={{
              position: "absolute",
              left: dotX,
              top: dotY + dotBounce,
              width: DOT_SIZE,
              height: DOT_SIZE,
              fontSize: 32,
              transition: "none",
              userSelect: "none",
              filter: "drop-shadow(0 0 8px #38bdf8)",
            }}
          >
            <span role="img" aria-label="star">🌟</span>
          </div>
          {/* Player (spaceship) */}
          <div
            style={{
              position: "absolute",
              left: playerX,
              top: GAME_HEIGHT - PLAYER_HEIGHT - 10,
              width: PLAYER_WIDTH,
              height: PLAYER_HEIGHT,
              fontSize: 44,
              textAlign: "center",
              userSelect: "none",
              filter: "drop-shadow(0 8px 12px #0008)",
              transition: "left 0.1s",
            }}
          >
            <span role="img" aria-label="spaceship">🚀</span>
          </div>
          {/* Score */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 16,
              color: "#fbbf24",
              fontWeight: "bold",
              fontSize: 20,
              background: "rgba(31,41,55,0.7)",
              borderRadius: 8,
              padding: "2px 14px",
              letterSpacing: 1,
              fontFamily: "'Orbitron', 'Segoe UI', Arial, sans-serif",
              boxShadow: "0 2px 8px #0004",
            }}
          >
            Score: {score}
          </div>
          {/* Game Over */}
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 rounded-2xl z-20">
              <div className="text-white text-3xl font-extrabold mb-2 drop-shadow-lg">Game Over!</div>
              <div className="text-indigo-200 mb-4 text-lg">Final Score: <span className="font-bold text-yellow-300">{score}</span></div>
              <button
                onClick={restart}
                className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
        <div className="mt-6 text-indigo-200 text-base flex items-center gap-2">
          Use <span className="font-bold bg-gray-900 px-2 py-1 rounded">←</span> and <span className="font-bold bg-gray-900 px-2 py-1 rounded">→</span> to move your spaceship!
        </div>
        <a
          href="/"
          className="mt-8 text-lg text-yellow-300 underline hover:text-pink-400 transition font-bold"
        >
          Return to Home
        </a>
      </div>
      {/* Google Fonts for Orbitron */}
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap" rel="stylesheet" />
    </div>
  );
}

export default NotFoundGame;