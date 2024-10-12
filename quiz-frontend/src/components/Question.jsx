import React from 'react';

const Question = ({ questionData, index, onAnswer }) => {
  const handleOptionChange = (selectedOption) => {
    onAnswer(index, selectedOption);
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">{`Question ${index + 1}: ${questionData.question}`}</h2>
      <div className="flex flex-col space-y-2">
        {questionData.options.map((option, optionIndex) => (
          <label key={optionIndex} className="flex items-center">
            <input
              type="radio"
              name={`question-${index}`}
              value={optionIndex}
              checked={questionData.selectedOption === optionIndex}
              onChange={() => handleOptionChange(optionIndex)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;
