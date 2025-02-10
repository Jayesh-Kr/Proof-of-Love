import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import LandingPage from "./pages/landingPage/LandingPage";
import Breakup from "./pages/breakup/Breakup";
import Leaderboard from "./pages/leaderboard/LeaderBoard";
import LoveStories from "./pages/lovestories/LoveStories";
import Gifts from "./pages/gifts/Gifts";
import { useAccount } from "wagmi";
// import { useEffect, useState } from "react";
// import WalletPopup from "./components/walletpopup/WalletPopUp";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { address } = useAccount();

  if(!address)
    return <Navigate to="/" replace/>
  return children;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="mt">
        <Routes>
          <Route
            path="/"
            element={
                <LandingPage />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/breakup"
            element={
              <ProtectedRoute>
                <Breakup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lovestory"
            element={
              <ProtectedRoute>
                <LoveStories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gifts"
            element={
              <ProtectedRoute>
                <Gifts />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
