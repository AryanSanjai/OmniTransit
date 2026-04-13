import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Bus, Train, Landmark, CheckCircle2, Globe, ArrowLeft } from "lucide-react";

export default function Network() {
  const cities = [
    { name: "Chennai", status: "Active", modes: ["Metro", "Toll", "Bus"] },
    { name: "Vellore", status: "Active", modes: ["Toll", "Bus"] },
    { name: "Bangalore", status: "Active", modes: ["Metro", "Toll", "Bus"] },
    { name: "Mumbai", status: "Coming Soon", modes: ["Metro", "Monorail"] },
    { name: "Delhi", status: "Active", modes: ["Metro", "Toll"] },
    { name: "Hyderabad", status: "Coming Soon", modes: ["Metro"] },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      </div>

      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-32">
        <header className="mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6">
            <Globe size={14} className="text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Live Network Status</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Expanding Across <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">The Nation.</span>
          </h1>
          <p className="text-slate-400 max-w-xl text-lg font-medium leading-relaxed">
            One wallet, infinite possibilities. We are integrating major transit hubs to ensure you never have to carry cash or multiple cards again.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Active Cities", value: "12+" },
            { label: "Toll Plazas", value: "450+" },
            { label: "Metro Stations", value: "85+" },
            { label: "Daily Users", value: "20k+" },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-slate-900/40 border border-white/5 rounded-3xl backdrop-blur-md">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* City Network Table */}
        <div className="bg-slate-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
          <div className="p-8 border-b border-white/5">
            <h2 className="text-2xl font-bold text-white">Coverage Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
                  <th className="px-8 py-6">City</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6">Supported Modes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {cities.map((city, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <MapPin size={16} className="text-slate-400 group-hover:text-white" />
                      </div>
                      <span className="font-bold text-slate-200">{city.name}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        city.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {city.status === 'Active' && <CheckCircle2 size={12} />}
                        {city.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-4">
                        {city.modes.map((mode, idx) => (
                          <span key={idx} className="flex items-center gap-1 text-xs font-bold text-slate-500">
                            {mode === 'Metro' && <Train size={14} />}
                            {mode === 'Bus' && <Bus size={14} />}
                            {mode === 'Toll' && <Landmark size={14} />}
                            {mode}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}