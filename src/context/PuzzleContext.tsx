import React, { createContext, useContext, useState } from 'react';

interface PuzzleContextType {
  submitAnswer: (answer: string) => boolean;
  useHint: () => void;
  hintsRemaining: number;
}

const PuzzleContext = createContext<PuzzleContextType | undefined>(undefined);

export const PuzzleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hintsRemaining, setHintsRemaining] = useState(3);

  const submitAnswer = (answer: string): boolean => {
    // TODO: Implémenter la logique de vérification des réponses
    return answer.toLowerCase() === 'the most and the most';
  };

  const useHint = () => {
    if (hintsRemaining > 0) {
      setHintsRemaining(hintsRemaining - 1);
      // TODO: Implémenter la logique d'affichage des indices
      alert('Indice : Chaque lettre a été décalée de 4 positions dans l\'alphabet');
    } else {
      alert('Vous n\'avez plus d\'indices disponibles !');
    }
  };

  const value = {
    submitAnswer,
    useHint,
    hintsRemaining
  };

  return (
    <PuzzleContext.Provider value={value}>
      {children}
    </PuzzleContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const usePuzzle = (): PuzzleContextType => {
  const context = useContext(PuzzleContext);
  if (!context) {
    throw new Error('usePuzzle must be used within a PuzzleProvider');
  }
  return context;
}; 