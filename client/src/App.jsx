import Home from "./pages/Home";
import BuyCredits from "./pages/BuyCredits";
import Result from "./pages/Result";
import { Routes, Route } from "react-router-dom"; //establishing routes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer2";
import Login from "./components/Login";
import { useContext } from "react";
import { AppContext } from "./context/AppContext"; //importing context

const App = () => {
  const { showLogin } = useContext(AppContext);
  return (
    //made diff routes for diff pages
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<BuyCredits />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
