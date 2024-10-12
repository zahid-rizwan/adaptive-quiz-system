import React from 'react';
import { FaCalculator } from 'react-icons/fa';

const QuizHeader = ({ timer, handleFullScreenToggle, isFullScreen }) => {
  return (
    <header className="w-full flex justify-between items-center p-4 bg-blue-600 text-white">
      {/* Quiz Timer */}
      <div>
        <span className="text-xl">Timer: {timer}</span>
      </div>

      {/* Full Screen Toggle and Calculator */}
      <div className="flex space-x-4">
        {/* Calculator Icon */}
        <button className="text-2xl">
          <FaCalculator />
        </button>

        {/* Full Screen Toggle */}
        <button onClick={handleFullScreenToggle}>
          {isFullScreen ? 'Exit Full Screen' : 'Go Full Screen'}
        </button>
      </div>
    </header>
  );
};

export default QuizHeader;
