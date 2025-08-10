import React from "react";
import Home from "./pages/Home";
import BuyCredits from "./pages/BuyCredits";
import Result from "./pages/Result";
import { Routes, Route } from "react-router-dom"; //establishing routes
import Navbar from "./components/Navbar";

const App = () => {
  return (
    //made diff routes for diff pages
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy-credits" element={<BuyCredits />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
};

export default App;
