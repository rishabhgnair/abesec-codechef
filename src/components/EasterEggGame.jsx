import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Trophy, RefreshCw, Sparkles } from 'lucide-react';

export default function EasterEggGame({ isOpen, onClose }) {
  const [score, setScore] = useState(0);
  const [pacmanPos, setPacmanPos] = useState({ x: 2, y: 2 });
  const [ghostPos, setGhostPos] = useState({ x: 6, y: 6 });
  const [dots, setDots] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // 8x8 Grid
  const GRID_SIZE = 8;

  const initGame = () => {
    const initialDots = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (!(r === 2 && c === 2) && !(r === 6 && c === 6)) {
          initialDots.push(`${r}-${c}`);
        }
      }
    }
    setDots(initialDots);
    setPacmanPos({ x: 2, y: 2 });
    setGhostPos({ x: 6, y: 6 });
    setScore(0);
    setGameOver(false);
    setGameWon(false);
  };

  useEffect(() => {
    if (isOpen) {
      initGame();
    }
  }, [isOpen]);

  // Handle keyboard arrow keys
  useEffect(() => {
    if (!isOpen || gameOver || gameWon) return;

    const handleKeyDown = (e) => {
      let dx = 0;
      let dy = 0;

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') dy = -1;
      else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') dy = 1;
      else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') dx = -1;
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') dx = 1;
      else return;

      e.preventDefault();

      setPacmanPos((prev) => {
        const nx = Math.max(0, Math.min(GRID_SIZE - 1, prev.x + dx));
        const ny = Math.max(0, Math.min(GRID_SIZE - 1, prev.y + dy));

        // Eat dot
        const key = `${ny}-${nx}`;
        setDots((prevDots) => {
          if (prevDots.includes(key)) {
            setScore((s) => s + 10);
            const remaining = prevDots.filter((d) => d !== key);
            if (remaining.length === 0) {
              setGameWon(true);
            }
            return remaining;
          }
          return prevDots;
        });

        return { x: nx, y: ny };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, gameOver, gameWon]);

  // Ghost AI loop
  useEffect(() => {
    if (!isOpen || gameOver || gameWon) return;

    const timer = setInterval(() => {
      setGhostPos((prev) => {
        const dx = pacmanPos.x > prev.x ? 1 : pacmanPos.x < prev.x ? -1 : 0;
        const dy = pacmanPos.y > prev.y ? 1 : pacmanPos.y < prev.y ? -1 : 0;

        // Randomize 30% of moves so ghost doesn't instantly corner
        let nx = prev.x;
        let ny = prev.y;

        if (Math.random() < 0.7) {
          if (Math.abs(pacmanPos.x - prev.x) > Math.abs(pacmanPos.y - prev.y)) {
            nx = Math.max(0, Math.min(GRID_SIZE - 1, prev.x + dx));
          } else {
            ny = Math.max(0, Math.min(GRID_SIZE - 1, prev.y + dy));
          }
        } else {
          const randDir = Math.random();
          if (randDir < 0.25) nx = Math.max(0, prev.x - 1);
          else if (randDir < 0.5) nx = Math.min(GRID_SIZE - 1, prev.x + 1);
          else if (randDir < 0.75) ny = Math.max(0, prev.y - 1);
          else ny = Math.min(GRID_SIZE - 1, prev.y + 1);
        }

        // Check collision
        if (nx === pacmanPos.x && ny === pacmanPos.y) {
          setGameOver(true);
        }

        return { x: nx, y: ny };
      });
    }, 450);

    return () => clearInterval(timer);
  }, [isOpen, pacmanPos, gameOver, gameWon]);

  // Direct collision check
  useEffect(() => {
    if (pacmanPos.x === ghostPos.x && pacmanPos.y === ghostPos.y) {
      setGameOver(true);
    }
  }, [pacmanPos, ghostPos]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="SECRET RETRO ARENA"
      subtitle="KONAMI CODE / 5-GHOST EASTER EGG UNLOCKED!"
      borderColor="border-arcade-cyan"
      shadowColor="shadow-arcade-cyan"
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center">
        {/* Score HUD */}
        <div className="flex items-center justify-between w-full mb-4 px-2 font-arcade text-xs">
          <span className="text-arcade-yellow">SCORE: {score}</span>
          <span className="text-arcade-pink flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" /> HIGH: 99990
          </span>
        </div>

        {/* 8x8 Board */}
        <div className="bg-black border-4 border-arcade-neonBlue rounded-lg p-2 grid grid-cols-8 gap-1 shadow-[0_0_20px_rgba(0,81,255,0.4)]">
          {Array.from({ length: GRID_SIZE }).map((_, r) =>
            Array.from({ length: GRID_SIZE }).map((_, c) => {
              const isPacman = pacmanPos.x === c && pacmanPos.y === r;
              const isGhost = ghostPos.x === c && ghostPos.y === r;
              const hasDot = dots.includes(`${r}-${c}`);

              return (
                <div
                  key={`${r}-${c}`}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-arcade-dark/80 rounded"
                >
                  {isPacman ? (
                    <span className="text-xl animate-bounce">🟡</span>
                  ) : isGhost ? (
                    <span className="text-xl animate-ghost-float">👻</span>
                  ) : hasDot ? (
                    <span className="w-2 h-2 rounded-full bg-arcade-pellet shadow-[0_0_4px_#ffb8ae]"></span>
                  ) : null}
                </div>
              );
            })
          )}
        </div>

        {/* Game State Overlay */}
        {gameOver && (
          <div className="mt-4 text-center">
            <p className="font-arcade text-arcade-red text-sm mb-2 animate-pulse">
              GAME OVER - GHOST CAUGHT YOU!
            </p>
            <button
              onClick={initGame}
              className="px-4 py-2 bg-arcade-yellow text-arcade-dark font-arcade text-xs rounded font-bold shadow-arcade-yellow"
            >
              INSERT COIN (RETRY)
            </button>
          </div>
        )}

        {gameWon && (
          <div className="mt-4 text-center">
            <p className="font-arcade text-arcade-green text-sm mb-2">
              YOU CLEARED THE MAZE! 🍒
            </p>
            <button
              onClick={initGame}
              className="px-4 py-2 bg-arcade-yellow text-arcade-dark font-arcade text-xs rounded font-bold"
            >
              PLAY AGAIN
            </button>
          </div>
        )}

        {/* Controls Instructions */}
        {!gameOver && !gameWon && (
          <div className="mt-4 text-center text-slate-400 font-vt text-sm">
            USE ARROW KEYS OR W/A/S/D TO MOVE PAC-MAN & EAT PELLETS!
          </div>
        )}
      </div>
    </Modal>
  );
}
