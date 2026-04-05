import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { Wallet, Car, MapPin, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({ name: "User", balance: 0, vehicles: 0, trips: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: u } = await supabase.from("users").select("name").eq("user_id", user.id).single();
        const { data: w } = await supabase.from("wallet").select("balance").eq("user_id", user.id).single();
        const { count: v } = await supabase.from("vehicles").select("*", { count: 'exact', head: true }).eq("user_id", user.id);
        const { count: t } = await supabase.from("transit").select("*", { count: 'exact', head: true }).eq("user_id", user.id);
        
        setStats({
          name: u?.name || "User",
          balance: w?.balance || 0,
          vehicles: v || 0,
          trips: t || 0
        });
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) return <div className="p-20 text-center font-bold text-gray-300 animate-pulse">Syncing Dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-10">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Welcome, {stats.name}!</h2>
        <p className="text-gray-500 mt-2 font-medium">Your transit network is running smoothly today.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Wallet Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
          <Wallet className="mb-6 opacity-80" />
          <p className="text-xs font-black uppercase tracking-widest opacity-70">Current Balance</p>
          <h3 className="text-5xl font-black mt-2 mb-8">₹{stats.balance}</h3>
          <Link to="/app/wallet" className="inline-flex items-center gap-2 text-sm font-bold bg-white/20 px-4 py-2 rounded-xl hover:bg-white/30 transition">
            <Plus size={16} /> Top Up Wallet
          </Link>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        </div>

        {/* Vehicles Card */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <Car className="text-cyan-500 mb-6" />
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Active Vehicles</p>
            <h3 className="text-5xl font-black text-gray-800 mt-2">{stats.vehicles}</h3>
          </div>
          <Link to="/app/vehicles" className="text-cyan-600 font-bold text-sm mt-8 hover:underline">Manage Garage →</Link>
        </div>

        {/* Trips Card */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <MapPin className="text-purple-500 mb-6" />
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Journeys</p>
            <h3 className="text-5xl font-black text-gray-800 mt-2">{stats.trips}</h3>
          </div>
          <Link to="/app/transit" className="text-purple-600 font-bold text-sm mt-8 hover:underline">Book New Trip →</Link>
        </div>
      </div>
    </div>
  );
}