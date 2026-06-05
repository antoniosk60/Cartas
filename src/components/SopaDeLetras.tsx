import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, RefreshCw, CheckCircle } from 'lucide-react';

interface CellPos {
  r: number;
  c: number;
}

interface TargetWord {
  word: string;
  coords: CellPos[];
  found: boolean;
  color: string;
}

export const SopaDeLetras: React.FC = () => {
  const size = 12;

  // Exact 12x12 grid containing our hidden words
  const initialGrid = [
    ['S', 'E', 'N', 'T', 'I', 'M', 'I', 'E', 'N', 'T', 'O', 'S'], // Row 0: SENTIMIENTOS
    ['P', 'X', 'B', 'V', 'K', 'J', 'U', 'Y', 'C', 'L', 'F', 'W'], // Row 1
    ['H', 'Y', 'F', 'U', 'P', 'A', 'M', 'O', 'R', 'Q', 'X', 'V'], // Row 2: FELICIDAD (Col 2), AMOR (Cols 5-8)
    ['X', 'Z', 'E', 'B', 'T', 'W', 'N', 'M', 'K', 'D', 'P', 'C'], // Row 3: CARIÑO (Col 11)
    ['J', 'O', 'L', 'Y', 'F', 'G', 'H', 'R', 'Q', 'V', 'Z', 'A'], // Row 4: CARIÑO (Col 11)
    ['V', 'P', 'I', 'S', 'U', 'T', 'D', 'F', 'B', 'N', 'W', 'R'], // Row 5: CARIÑO (Col 11)
    ['N', 'Q', 'C', 'X', 'K', 'L', 'A', 'P', 'G', 'R', 'H', 'I'], // Row 6: CARIÑO (Col 11)
    ['T', 'U', 'I', 'W', 'B', 'E', 'S', 'O', 'Y', 'X', 'M', 'Ñ'], // Row 7: BESO (Cols 4-7), CARIÑO (Col 11)
    ['Z', 'A', 'D', 'K', 'F', 'J', 'D', 'L', 'W', 'Q', 'B', 'O'], // Row 8: CARIÑO (Col 11)
    ['B', 'N', 'A', 'X', 'R', 'E', 'S', 'P', 'E', 'T', 'O', 'V'], // Row 9: RESPETO (Cols 4-10)
    ['T', 'F', 'D', 'V', 'K', 'G', 'H', 'J', 'S', 'B', 'P', 'Y'], // Row 10
    ['W', 'K', 'E', 'M', 'O', 'C', 'I', 'O', 'N', 'E', 'S', 'Z']  // Row 11: EMOCIONES (Cols 2-10)
  ];

  // List of words with their exact coordinate definitions (row, column) to facilitate detection
  const initialWords: TargetWord[] = [
    {
      word: 'SENTIMIENTOS',
      coords: Array.from({ length: 12 }, (_, i) => ({ r: 0, c: i })),
      found: false,
      color: 'bg-rose-200 text-rose-800'
    },
    {
      word: 'FELICIDAD',
      coords: Array.from({ length: 9 }, (_, i) => ({ r: 2 + i, c: 2 })),
      found: false,
      color: 'bg-purple-200 text-purple-800'
    },
    {
      word: 'EMOCIONES',
      coords: Array.from({ length: 9 }, (_, i) => ({ r: 11, c: 2 + i })),
      found: false,
      color: 'bg-sky-200 text-sky-800'
    },
    {
      word: 'AMOR',
      coords: Array.from({ length: 4 }, (_, i) => ({ r: 2, c: 5 + i })),
      found: false,
      color: 'bg-pink-200 text-pink-800'
    },
    {
      word: 'BESO',
      coords: Array.from({ length: 4 }, (_, i) => ({ r: 7, c: 4 + i })),
      found: false,
      color: 'bg-emerald-200 text-emerald-800'
    },
    {
      word: 'RESPETO',
      coords: Array.from({ length: 7 }, (_, i) => ({ r: 9, c: 4 + i })),
      found: false,
      color: 'bg-amber-200 text-amber-800'
    },
    {
      word: 'CARIÑO',
      coords: Array.from({ length: 6 }, (_, i) => ({ r: 3 + i, c: 11 })),
      found: false,
      color: 'bg-indigo-300 text-indigo-900'
    }
  ];

  const [words, setWords] = useState<TargetWord[]>(initialWords);
  const [selectedCells, setSelectedCells] = useState<CellPos[]>([]);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [startCell, setStartCell] = useState<CellPos | null>(null);
  const [successMsg, setSuccessMsg] = useState<boolean>(false);

  // Checks if a cell is selected currently
  const isCellSelected = (r: number, c: number) => {
    return selectedCells.some(cell => cell.r === r && cell.c === c);
  };

  // Checks if a cell is part of a found word
  const getCellFoundColor = (r: number, c: number) => {
    for (const w of words) {
      if (w.found && w.coords.some(cell => cell.r === r && cell.c === c)) {
        return w.color;
      }
    }
    return '';
  };

  // Handles starting selection (mouse down or first tap)
  const handleCellStart = (r: number, c: number) => {
    setIsSelecting(true);
    setStartCell({ r, c });
    setSelectedCells([{ r, c }]);
  };

  // Handles updating selection as dragging moves over cells
  const handleCellHover = (r: number, c: number) => {
    if (!isSelecting || !startCell) return;

    // We only select in straight lines (horizontal, vertical, diagonal)
    const dr = r - startCell.r;
    const dc = c - startCell.c;

    const absDr = Math.abs(dr);
    const absDc = Math.abs(dc);

    // Coordinate line calculation
    if (dr === 0 || dc === 0 || absDr === absDc) {
      const stepR = dr === 0 ? 0 : dr / absDr;
      const stepC = dc === 0 ? 0 : dc / absDc;
      const steps = Math.max(absDr, absDc);

      const newSelection: CellPos[] = [];
      for (let i = 0; i <= steps; i++) {
        newSelection.push({
          r: startCell.r + (stepR * i),
          c: startCell.c + (stepC * i)
        });
      }
      setSelectedCells(newSelection);
    }
  };

  // Handles ending selection (mouse up or final click)
  const handleCellEnd = () => {
    if (!isSelecting) return;
    setIsSelecting(false);

    // Verify if the selection matches one of our words
    const matchedWordIndex = words.findIndex(w => {
      if (w.found) return false;
      // Must have the same length
      if (w.coords.length !== selectedCells.length) return false;

      // Coordinate matching (independent of forward/backward drag order)
      const matchesForward = w.coords.every((tc, idx) => {
        const sc = selectedCells[idx];
        return sc.r === tc.r && sc.c === tc.c;
      });

      const matchesBackward = w.coords.every((tc, idx) => {
        const sc = selectedCells[selectedCells.length - 1 - idx];
        return sc.r === tc.r && sc.c === tc.c;
      });

      return matchesForward || matchesBackward;
    });

    if (matchedWordIndex !== -1) {
      const updated = [...words];
      updated[matchedWordIndex].found = true;
      setWords(updated);
    }

    setSelectedCells([]);
    setStartCell(null);
  };

  // Mouse up event listener on window to make sure dragging ends cleanly anywhere
  useEffect(() => {
    const globalMouseUp = () => {
      if (isSelecting) {
        handleCellEnd();
      }
    };
    window.addEventListener('mouseup', globalMouseUp);
    return () => window.removeEventListener('mouseup', globalMouseUp);
  }, [isSelecting, selectedCells, startCell]);

  // Check if all words are found for win celebration!
  useEffect(() => {
    if (words.every(w => w.found)) {
      setSuccessMsg(true);
    }
  }, [words]);

  const resetGame = () => {
    setWords(initialWords.map(w => ({ ...w, found: false })));
    setSelectedCells([]);
    setSuccessMsg(false);
  };

  return (
    <div className="flex flex-col items-center bg-white/75 backdrop-blur-xs p-4 sm:p-6 rounded-3xl border border-rose-100 shadow-xs max-w-2xl w-full mx-auto" id="sopa-de-letras-box">
      <div className="flex items-center gap-2 mb-3">
        <Heart className="text-rose-500 fill-rose-500 animate-pulse w-5 h-5" />
        <h3 className="font-cursive text-2xl text-rose-800 font-bold">Sopa de Amor</h3>
        <Sparkles className="text-amber-500 w-4 h-4 animate-bounce" />
      </div>
      
      <p className="text-slate-600 text-xs sm:text-sm text-center mb-4 max-w-md">
        Arrastra o toca el inicio y arrastra tu dedo hasta el final de cada palabra oculta. ¡Encuentra las 7 palabras mágicas!
      </p>

      {/* Grid view */}
      <div 
        className="grid grid-cols-12 gap-1 border-4 border-rose-200/60 p-2 rounded-2xl bg-amber-50/10 select-none touch-none overflow-hidden max-w-full"
        onMouseLeave={handleCellEnd}
        id="letters-grid"
      >
        {initialGrid.map((row, rIdx) => 
          row.map((char, cIdx) => {
            const isSelected = isCellSelected(rIdx, cIdx);
            const foundColor = getCellFoundColor(rIdx, cIdx);
            
            let displayStyle = "bg-white/80 text-rose-900 border border-rose-50/60 font-cursive font-bold text-base sm:text-lg md:text-xl w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg transition-colors cursor-pointer select-none";
            if (isSelected) {
              displayStyle = "bg-rose-400 text-white font-cursive font-bold text-base sm:text-lg md:text-xl w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg scale-95 shadow-inner cursor-pointer select-none";
            } else if (foundColor) {
              displayStyle = `${foundColor} font-cursive font-bold text-base sm:text-lg md:text-xl w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg shadow-xs cursor-pointer select-none`;
            }

            return (
              <div
                key={`${rIdx}-${cIdx}`}
                className={displayStyle}
                onMouseDown={() => handleCellStart(rIdx, cIdx)}
                onMouseEnter={() => handleCellHover(rIdx, cIdx)}
                onTouchStart={(e) => {
                  // Get touch point element to handle hover manually for touch events
                  const touch = e.touches[0];
                  const elem = document.elementFromPoint(touch.clientX, touch.clientY);
                  if (elem && elem.getAttribute('data-r')) {
                    const r = parseInt(elem.getAttribute('data-r') || '0');
                    const c = parseInt(elem.getAttribute('data-c') || '0');
                    handleCellStart(r, c);
                  }
                }}
                onTouchMove={(e) => {
                  const touch = e.touches[0];
                  const elem = document.elementFromPoint(touch.clientX, touch.clientY);
                  if (elem && elem.getAttribute('data-r')) {
                    const r = parseInt(elem.getAttribute('data-r') || '0');
                    const c = parseInt(elem.getAttribute('data-c') || '0');
                    handleCellHover(r, c);
                  }
                }}
                onTouchEnd={handleCellEnd}
                data-r={rIdx}
                data-c={cIdx}
                id={`cell-${rIdx}-${cIdx}`}
              >
                {char}
              </div>
            );
          })
        )}
      </div>

      {/* Target Word lists */}
      <div className="mt-5 w-full">
        <h4 className="font-cursive text-lg text-rose-700/80 mb-2 font-bold text-center">Palabras a buscar:</h4>
        <div className="flex flex-wrap justify-center gap-2" id="word-badges-container">
          {words.map((w, idx) => (
            <span
              key={idx}
              id={`word-badge-${w.word}`}
              className={`px-3 py-1 text-xs sm:text-sm font-cursive rounded-full border border-pink-100 transition-all duration-300 flex items-center gap-1 ${
                w.found 
                  ? 'bg-rose-100 text-rose-500 line-through opacity-70 decoration-2 decoration-rose-400' 
                  : 'bg-white text-rose-700 shadow-2xs hover:scale-105'
              }`}
            >
              {w.found && <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />}
              {w.word}
            </span>
          ))}
        </div>
      </div>

      {/* Celebration overlay */}
      {successMsg && (
        <div className="mt-6 p-4 bg-rose-50 border-2 border-dashed border-rose-300 rounded-2xl text-center w-full animate-fade-in" id="sopa-success">
          <div className="flex justify-center gap-1 mb-2">
            <Heart className="text-rose-500 fill-rose-500 w-6 h-6 animate-ping" />
            <Heart className="text-rose-500 fill-rose-500 w-6 h-6" />
            <Heart className="text-rose-500 fill-rose-500 w-6 h-6 animate-ping" />
          </div>
          <p className="font-cursive text-xl text-rose-800 font-bold mb-1">¡Lo lograste, mi amor! ❤️</p>
          <p className="text-slate-600 text-xs sm:text-sm mb-3">Encontraste todas nuestras palabras. Eres increíble.</p>
          <button 
            onClick={resetGame}
            className="flex items-center gap-2 mx-auto bg-rose-500 hover:bg-rose-600 text-white font-cursive text-sm py-1.5 px-4 rounded-full shadow-xs transition-transform active:scale-95"
            id="reset-sopa"
          >
            <RefreshCw className="w-4 h-4" /> Volver a jugar
          </button>
        </div>
      )}
    </div>
  );
};
