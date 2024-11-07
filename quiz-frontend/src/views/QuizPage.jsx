import React, { useState, useEffect } from 'react';

const QuizPage = () => {
  const [isConfirmingExit, setIsConfirmingExit] = useState(false);

  useEffect(() => {
    openFullscreen();

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const openFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      setIsConfirmingExit(true);
    }
  };

  const confirmExit = () => {
    closeFullscreen();
    console.log("Exiting the quiz...");
  };

  const cancelExit = () => {
    setIsConfirmingExit(false);
    openFullscreen();
  };

  return (
    <div className="quiz-page flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Quiz Page</h1>
      {/* Quiz content goes here */}

      {/* Exit Confirmation Dialog */}
      {isConfirmingExit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-medium mb-4">Are you sure you want to exit the quiz?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmExit}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Confirm
              </button>
              <button
                onClick={cancelExit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
