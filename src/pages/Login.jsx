import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, Globe } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert(error.message);
    } else {
      navigate("/app");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 font-sans p-6 md:p-10 flex items-center justify-center">
      
      {/* 🌌 Matching Mesh Background Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/30 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-white/50 relative z-10 overflow-hidden min-h-[650px]">
        
        {/* --- Left Column: Security & Focus --- */}
        <div className="w-full md:w-5/12 p-12 md:p-16 bg-gray-900 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <Link to="/" className="text-xl font-black text-white tracking-tighter flex items-center gap-2 mb-16 hover:opacity-80 transition">
              <div className="w-7 h-7 bg-blue-600 rounded-lg shadow-lg"></div> 
              OmniTransit
            </Link>
            
            <h2 className="text-5xl font-black leading-tight mb-6 tracking-tighter">
              Welcome <br /> 
              <span className="text-blue-400 font-outline-2">Back.</span>
            </h2>
            <p className="text-gray-400 font-medium leading-relaxed">
              Sign in to manage your fleet, check your digital wallet, and view recent journeys across the network.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-sm font-bold text-emerald-400 bg-emerald-500/10 w-fit px-4 py-2 rounded-xl border border-emerald-500/20">
              <ShieldCheck size={18} />
              Bank-Grade Security Active
            </div>
          </div>

          {/* Abstract glow */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
        </div>

        {/* --- Right Column: The Login Form --- */}
        <div className="w-full md:w-7/12 p-12 md:p-20 bg-white flex flex-col justify-center">
          <div className="mb-12">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Member Portal</h3>
            <p className="text-2xl font-black text-gray-800">Sign in to your ID</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-2">Email Address</label>
              <div className="relative group">
                <input 
                  type="email" required placeholder="Enter your email"
                  className="w-full p-4 pl-12 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 transition-all outline-none font-bold text-gray-700 placeholder:text-gray-300"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
                <button type="button" className="text-[10px] font-black text-blue-500 uppercase hover:underline">Forgot?</button>
              </div>
              <div className="relative group">
                <input 
                  type="password" required placeholder="Enter your password"
                  className="w-full p-4 pl-12 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 transition-all outline-none font-bold text-gray-700 placeholder:text-gray-300"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-between items-center">
               <p className="text-sm font-medium text-gray-400">
                 New to the network? <br />
                 <Link to="/register" className="text-blue-600 font-bold hover:underline">Create a free account</Link>
               </p>
               <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-900 text-white px-12 py-4 rounded-2xl font-black hover:bg-black transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50 shadow-xl shadow-gray-200"
               >
                 {isSubmitting ? "Authenticating..." : "Sign In"} <LogIn size={20} />
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}