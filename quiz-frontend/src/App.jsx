import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
// import Home from "./views/home";
import Login from "./views/login";
import SignUp from "./views/signup";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./views/dashboard/dashboardLayout";
import QuizPage from "./views/dashboard/QuizPage";

function App() {
  return (
    <div className="w-full flex flex-col">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
        <Route path="/quiz-page*" element={<QuizPage/>} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
