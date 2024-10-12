// src/components/Calculator.js
import React, { useState } from 'react';

const Calculator = ({ onClose }) => {
  const [input, setInput] = useState('');

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleCalculate = () => {
    try {
      const result = eval(input); // Evaluate the expression
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  };

  const handleScientificFunction = (func) => {
    try {
      const result = Math[func](parseFloat(input));
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  };

  return (
    <div className="fixed top-1/3 left-1/3 w-80 bg-white shadow-lg p-4 rounded">
      <button onClick={onClose} className="absolute top-2 right-2 text-red-500">X</button>
      <div className="mb-4">
        <input type="text" value={input} readOnly className="border border-gray-300 p-2 w-full" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((item) => (
          <button
            key={item}
            onClick={() => item === '=' ? handleCalculate() : handleButtonClick(item)}
            className="border border-gray-300 p-2 bg-blue-500 text-white hover:bg-blue-600"
          >
            {item}
          </button>
        ))}
        <button onClick={handleClear} className="col-span-2 border border-gray-300 p-2 bg-red-500 text-white hover:bg-red-600">Clear</button>
        {['sin', 'cos', 'tan', 'sqrt'].map((func) => (
          <button
            key={func}
            onClick={() => handleScientificFunction(func)}
            className="border border-gray-300 p-2 bg-blue-500 text-white hover:bg-blue-600"
          >
            {func}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
