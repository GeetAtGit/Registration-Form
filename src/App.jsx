import React from "react";
import { Routes, Route } from "react-router-dom";
import FormPage from "./FormPage";
import SummaryPage from "./SummaryPage";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </div>
  );
};

export default App;
