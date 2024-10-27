import React, { useRef, useState, useEffect } from 'react';
import { FaPencilAlt, FaEraser, FaUndo, FaRedo, FaSave, FaRegSquare, FaRegCircle, FaRegMinusSquare } from 'react-icons/fa';

const Blackboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [penColor, setPenColor] = useState('#FFFFFF');
  const [penSize, setPenSize] = useState(5);
  const [currentTool, setCurrentTool] = useState('pen');
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      setContext(ctx);
    }
  }, []);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setStartPos({ x: offsetX, y: offsetY });
    setIsDrawing(true);

    if (currentTool === 'pen' || currentTool === 'eraser') {
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    }
  };

  const finishDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
      context.closePath();
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;

    context.lineWidth = penSize;
    context.strokeStyle = currentTool === 'eraser' ? '#000000' : penColor;

    if (currentTool === 'pen' || currentTool === 'eraser') {
      context.lineTo(offsetX, offsetY);
      context.stroke();
    } else if (['line', 'rectangle', 'circle'].includes(currentTool)) {
      drawShape(startPos.x, startPos.y, offsetX, offsetY);
    }
  };

  const drawShape = (x1, y1, x2, y2) => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    context.beginPath();
    if (currentTool === 'line') {
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
    } else if (currentTool === 'rectangle') {
      context.rect(x1, y1, x2 - x1, y2 - y1);
    } else if (currentTool === 'circle') {
      const radius = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      context.arc(x1, y1, radius, 0, Math.PI * 2);
    }
    context.stroke();
  };

  const clearCanvas = () => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHistory([]);
    setHistoryIndex(-1);
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    const imgData = canvas.toDataURL();
    const newHistory = [...history.slice(0, historyIndex + 1), imgData];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const img = new Image();
      img.src = history[historyIndex - 1];
      img.onload = () => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(img, 0, 0);
      };
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const img = new Image();
      img.src = history[historyIndex + 1];
      img.onload = () => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(img, 0, 0);
      };
      setHistoryIndex(historyIndex + 1);
    }
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col items-center p-5 bg-gray-900 text-white">
      <h2 className="text-2xl mb-4">Interactive Blackboard</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="color"
          value={penColor}
          onChange={(e) => setPenColor(e.target.value)}
          title="Select Pen Color"
          className="cursor-pointer"
        />
        <select
          value={penSize}
          onChange={(e) => setPenSize(parseInt(e.target.value, 10))}
          className="bg-gray-800 text-white rounded cursor-pointer"
        >
          <option value={2}>Small</option>
          <option value={5}>Medium</option>
          <option value={10}>Large</option>
        </select>

        <button onClick={() => setCurrentTool('pen')} title="Pen">
          <FaPencilAlt className="text-xl cursor-pointer" />
        </button>
        <button onClick={() => setCurrentTool('eraser')} title="Eraser">
          <FaEraser className="text-xl cursor-pointer" />
        </button>
        <button onClick={() => setCurrentTool('line')} title="Line">
          <FaRegMinusSquare className="text-xl cursor-pointer" />
        </button>
        <button onClick={() => setCurrentTool('rectangle')} title="Rectangle">
          <FaRegSquare className="text-xl cursor-pointer" />
        </button>
        <button onClick={() => setCurrentTool('circle')} title="Circle">
          <FaRegCircle className="text-xl cursor-pointer" />
        </button>

        <button onClick={undo} title="Undo">
          <FaUndo className="text-xl cursor-pointer" />
        </button>
        <button onClick={redo} title="Redo">
          <FaRedo className="text-xl cursor-pointer" />
        </button>
        <button onClick={clearCanvas} className="bg-red-600 px-3 py-1 rounded" title="Clear Canvas">
          Clear
        </button>
        <button onClick={saveCanvas} title="Save as Image">
          <FaSave className="text-xl cursor-pointer" />
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}
        onMouseLeave={finishDrawing}
        className="border-2 border-gray-700 bg-black"
      />
    </div>
  );
};

export default Blackboard;
