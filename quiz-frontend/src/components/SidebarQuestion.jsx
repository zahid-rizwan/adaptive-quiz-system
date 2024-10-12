import React from "react";
import { IoIosArrowForward ,IoIosArrowBack} from "react-icons/io";


const SidebarQuestion = ({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  sidebarOpen,
  toggleSidebar,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-[90%] mt-16 flex  text-white  transition-all ${
        sidebarOpen ? "w-60" : "w-4 overflow-hidden"
      }`}
    >
      <div>
        <button  onClick={toggleSidebar} className="bg-gray-600 text-lg mt-96 text-black">
          {sidebarOpen ?  <IoIosArrowForward />:<IoIosArrowBack /> }
        </button>
      </div>
      <div className="bg-gray-800 w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Questions</h2>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {questions.map((q, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`p-2 text-white rounded ${
                q.selectedOption != null ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarQuestion;
