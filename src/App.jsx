import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public Marketing Pages
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Protected Application Pages
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Wallet from "./pages/Wallet";
import Transit from "./pages/Transit";
import Toll from "./pages/Toll";
import Profile from "./pages/Profile";

// Layout & Security Wrapper
import Layout from "./layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Access --- */}
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- Secure Dashboard Access --- */}
        {/* Everything under /app requires a login and uses the Layout sidebar */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Path: /app */}
          <Route index element={<Dashboard />} />
          
          {/* Path: /app/vehicles, /app/wallet, etc. */}
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="transit" element={<Transit />} />
          <Route path="toll" element={<Toll />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* --- Error Handling --- */}
        {/* Redirects any invalid URL back to the home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}