import { useState } from 'react'
import './App.css'
import QuizPage from './pages/QuizPage';
import Sidebar from './components/Sidebar'
import Header from './components/Header'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <>
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 bg-gray-100">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          {/* Add your content here */}
        </main>
      </div>
    </div>
  
    {/* <QuizPage/> */}
    </>
  );
}

export default App
