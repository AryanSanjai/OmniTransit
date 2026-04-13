import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Gift, 
  Zap, 
  Shield, 
  Globe, 
  CreditCard, 
  Activity, 
  ChevronRight 
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] selection:bg-blue-500/30 text-slate-200 font-sans overflow-x-hidden">
      
      {/* --- BACKGROUND ATTRACTIONS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-blue-600/15 rounded-full blur-[120px] animate-pulse transition-all duration-[4000ms]"></div>
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] animate-bounce transition-all duration-[6000ms]"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[100px]"></div>
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25 brightness-100 contrast-150 pointer-events-none"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-300">
              <Zap size={22} className="text-white fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">OmniTransit</span>
          </div>
          
          <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-widest text-slate-400">
            <Link to="/how-it-works" className="hover:text-blue-400 transition-colors">Process</Link>
            <Link to="/network" className="hover:text-blue-400 transition-colors">Network</Link>
            <Link to="/faq" className="hover:text-blue-400 transition-colors">Support</Link>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="hidden sm:block text-sm font-bold text-slate-400 hover:text-white transition">Login</Link>
            <Link to="/register" className="relative inline-flex h-11 active:scale-95 transition-transform overflow-hidden rounded-full p-[1px] focus:outline-none">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#1e3a8a_50%,#3b82f6_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-bold text-white backdrop-blur-3xl hover:bg-slate-900 transition-colors">
                Get Started
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="flex flex-col items-center text-center">
          
          {/*  Bouncing Bonus Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-5 py-2 rounded-full mb-10 animate-bounce shadow-[0_0_20px_rgba(59,130,246,0.15)] cursor-default">
            <Gift size={16} className="text-blue-400" />
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-blue-400">
              New: ₹100 Welcome Bonus Active
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[120px] font-black tracking-tighter text-white leading-[0.85] mb-8">
            Smart Travel. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-indigo-400 to-indigo-600">
              Simplified.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed font-medium">
            The unified digital wallet for India's modern commuter. Manage 
            <span className="text-blue-400 font-bold"> Tolls, Metro, and Bus fares </span> 
            without ever stopping.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mb-28">
            <Link to="/register" className="group px-12 py-5 bg-blue-600 text-white rounded-2xl font-black flex items-center gap-3 hover:bg-blue-500 transition-all shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:-translate-y-1 active:scale-95">
              Open My Wallet <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/how-it-works" className="px-12 py-5 bg-slate-900/40 border border-white/10 text-white rounded-2xl font-black hover:bg-slate-800 transition-all backdrop-blur-md hover:-translate-y-1 active:scale-95">
              View Roadmap
            </Link>
          </div>

          {/* --- BENTO FEATURE GRID --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            
            {/* Feature 1 */}
            <div className="p-10 bg-slate-900/30 border border-white/5 rounded-[3rem] text-left hover:border-blue-500/40 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                <Zap size={100} className="text-blue-400" />
              </div>
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:bg-blue-500/20">
                <Zap className="text-blue-400 fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Instant RFID</h3>
              <p className="text-slate-400 leading-relaxed font-medium">No-stop toll payments powered by automated database reconciliation.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-10 bg-slate-900/30 border border-white/5 rounded-[3rem] text-left hover:border-emerald-500/40 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                <Shield size={100} className="text-emerald-400" />
              </div>
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:bg-emerald-500/20">
                <Shield className="text-emerald-400 fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Bank-Grade</h3>
              <p className="text-slate-400 leading-relaxed font-medium">Secured with AES-256 encryption. Your transit history stays private.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-10 bg-slate-900/30 border border-white/5 rounded-[3rem] text-left hover:border-purple-500/40 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                <Globe size={100} className="text-purple-400" />
              </div>
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:bg-purple-500/20">
                <Globe className="text-purple-400 fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Pan-India</h3>
              <p className="text-slate-400 leading-relaxed font-medium">A unified transit network for tolls, metro, and buses across 50+ cities.</p>
            </div>

          </div>
        </div>
      </main>

      {/* Footer-lite */}
      <footer className="relative z-10 py-10 text-center border-t border-white/5">
        <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">
          © 2026 OmniTransit • Built for the Modern Commuter
        </p>
      </footer>
    </div>
  );
}