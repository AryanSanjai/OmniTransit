import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Car, Wallet as WalletIcon, Map, Route, User } from "lucide-react";
import { supabase } from "../services/supabase";

export default function Layout() {
  const location = useLocation();
  const [name, setName] = useState("User");

  useEffect(() => {
    async function fetchName() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from("users").select("name").eq("user_id", user.id).single();
        if (data) setName(data.name);
      }
    }
    fetchName();
  }, []);

  const menu = [
    { name: "Dashboard", path: "/app", icon: <Home size={20} /> },
    { name: "Vehicles", path: "/app/vehicles", icon: <Car size={20} /> },
    { name: "Wallet", path: "/app/wallet", icon: <WalletIcon size={20} /> },
    { name: "Transit", path: "/app/transit", icon: <Map size={20} /> },
    { name: "Toll", path: "/app/toll", icon: <Route size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-gray-900 text-white p-6 hidden md:flex flex-col">
        <h1 className="text-2xl font-bold text-cyan-400 mb-10">OmniTransit</h1>
        <nav className="flex flex-col gap-2">
          {menu.map((m) => (
            <Link key={m.name} to={m.path} className={`flex items-center gap-3 p-3 rounded-xl transition ${location.pathname === m.path ? "bg-cyan-600 shadow-lg shadow-cyan-900" : "hover:bg-gray-800"}`}>
              {m.icon} {m.name}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b px-8 flex justify-between items-center">
          <h2 className="font-bold text-gray-700">OmniTransit System</h2>
          <Link to="/app/profile" className="flex items-center gap-3 group">
            <span className="text-sm text-gray-400 group-hover:text-blue-500 transition">View Account</span>
            <div className="h-10 px-4 bg-blue-600 text-white rounded-full flex items-center font-bold text-sm shadow-md">
              {name}
            </div>
          </Link>
        </header>
        <section className="flex-1 overflow-y-auto p-8"><Outlet /></section>
      </main>
    </div>
  );
}