// import { useState } from 'react'
// import './App.css'
// import QuizPage from './pages/QuizPage';
// // import Sidebar from './components/Sidebar'
// // import Header from './components/Header'

// function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Toggle Sidebar function
//   // const toggleSidebar = () => {
//   //   setIsSidebarOpen(!isSidebarOpen);
//   // };

//   return (
//     // <div className="flex h-screen bg-white overflow-hidden">
//     //   {/* Sidebar */}
//     //   <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//     //   {/* Main content */}
//     //   <div className="flex-1 flex flex-col">
//     //     <Header toggleSidebar={toggleSidebar} />
//     //     <main className="flex-1 p-4 bg-gray-100">
//     //       <h1 className="text-2xl font-bold">Student Dashboard</h1>
//     //       {/* Add your content here */}
//     //     </main>
//     //   </div>
//     // </div>
//     <>
//     {/* <QuizPage/> */}
//     </>
//   );
// }

// export default App
import React, { useState, useEffect } from "react";
import Question from "../components/Question";
import { quizQuestions } from "../data/quizQuestions";
import SidebarQuestion from "../components/SidebarQuestion";
import QuizHeader from "../components/QuizHeader";

const QuizPage = () => {
  const [questions, setQuestions] = useState(quizQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timer, setTimer] = useState(3600); // 1 hour timer in seconds
  const [isFullScreen, setIsFullScreen] = useState(true);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleAnswer = (index, selectedOption) => {
    const newQuestions = [...questions];
    newQuestions[index].selectedOption = selectedOption;
    setQuestions(newQuestions);
  };

  const handleSaveNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleFullScreenToggle = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div
      className="flex flex-col h-screenvw-full
    "
    >
      {/* Header with Timer */}
      <QuizHeader
        timer={formatTime(timer)}
        handleFullScreenToggle={handleFullScreenToggle}
        isFullScreen={isFullScreen}
      />

      <div className="flex h-full w-full">
        {/* Sidebar */}
        <div className="p-36 w-5/6">
          <Question
            questionData={questions[currentQuestionIndex]}
            index={currentQuestionIndex}
            onAnswer={handleAnswer}
          />
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
            onClick={handleSaveNext}
          >
            Save and Next
          </button>
        </div>
        <div className="w-1/6">
          <SidebarQuestion
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>

        {/* Question Area */}
      </div>
    </div>
  );
};

export default QuizPage;
