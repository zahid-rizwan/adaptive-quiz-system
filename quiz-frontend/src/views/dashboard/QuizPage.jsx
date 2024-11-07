import React, { useState, useEffect } from "react";
import { IoMdTime } from "react-icons/io";
import { FcCalculator } from "react-icons/fc";

const QuizPage = () => {
  const [isConfirmingExit, setIsConfirmingExit] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is the capital of India?",
      options: [
        { id: 1, text: "Paris" },
        { id: 2, text: "New Delhi" },
        { id: 3, text: "Nepal" },
        { id: 4, text: "Iceland" },
      ],
      correctOptionId: 2,
    },
    {
      id: 2,
      question: "What is 2 + 2?",
      options: [
        { id: 1, text: "3" },
        { id: 2, text: "4" },
        { id: 3, text: "5" },
        { id: 4, text: "6" },
      ],
      correctOptionId: 2,
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    openFullscreen();
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
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
    window.history.back();
  };

  const cancelExit = () => {
    setIsConfirmingExit(false);
    openFullscreen();
  };

  const handleOptionSelect = (optionId) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.correctOptionId === optionId;
    console.log(isCorrect ? "Correct Answer!" : "Incorrect Answer");
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  return (
    <div className="relative quiz-page h-screen bg-gray-100">
      {/* Header */}
      <div className="absolute bg-gray-100 p-2 flex w-full border-b border-orange-500 h-20">
        <div className="w-8/12">
          <h1 className="text-lg font-semibold">Data Structure</h1>
          <span className="flex font-semibold text-gray-800">
            <span className="pr-0.5 pt-0.5 text-lg">
              <IoMdTime />
            </span>
            00:39:60
          </span>
        </div>
        <div className="w-4/12 flex justify-end mt-2">
          <span className="pt-1 text-4xl">
            <FcCalculator />
          </span>
          <div>
            <button className="bg-transparent mr-1 hover:bg-primary text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded">
              View instruction
            </button>
            <button className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 border bg-primary rounded">
              Button
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full h-full flex mt-20">
        <div className="w-9/12 flex items-center justify-center p-8">
          {/* Display current question and options */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {questions[currentQuestionIndex].question}
            </h2>
            <div className="flex flex-col space-y-3">
              {questions[currentQuestionIndex].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {option.text}
                </button>
              ))}
            </div>
            <button
              onClick={nextQuestion}
              className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Next Question
            </button>
          </div>
        </div>

        {/* Sidebar with question numbers */}
        <div className="w-3/12 border-l-2 p-4">
          <h3 className="text-lg font-semibold mb-4">Questions</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {Array.from({ length: 20 }, (_, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-full h-10 bg-gray-200 text-gray-700 font-semibold rounded-lg cursor-pointer hover:bg-gray-300"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      {isConfirmingExit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-medium mb-4">
              Are you sure you want to exit the quiz?
            </p>
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
