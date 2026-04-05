import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { 
  UserPlus, Mail, Lock, CheckCircle, Gift, ArrowRight 
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // UI & Success States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name: name } }
    });

    if (error) {
      alert("Registration failed: " + error.message);
    } else {
      // Trigger the interactive "Thank You" popup
      setShowModal(true);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 font-sans p-6 md:p-10">
      
      {/* 🌌 Animated Mesh Background Blobs */}
      <div className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] bg-blue-200/40 rounded-full blur-[130px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-15%] right-[-15%] w-[50%] h-[50%] bg-indigo-200/30 rounded-full blur-[130px] -z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-white/50 relative z-10 overflow-hidden min-h-[700px]">
        
        {/* --- Left Column: Brand & Value Prop --- */}
        <div className="w-full md:w-1/2 p-12 md:p-20 bg-gray-900 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-2xl font-black text-white tracking-tighter flex items-center gap-2 mb-12">
              <div className="w-8 h-8 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20"></div> 
              OmniTransit
            </h1>
            
            <h2 className="text-6xl font-black leading-none mb-6 tracking-tighter">
              Join the <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Network.</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-sm mb-12 font-medium">Connect your multi-city transit payments to a single secure digital identity.</p>
          </div>

          {/* Bonus Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-2 rounded-full shadow-sm mt-10 animate-pulse w-fit relative z-10">
            <Gift size={18} className="text-cyan-400" />
            <span className="text-sm font-black text-cyan-400 uppercase tracking-widest">
              Signup Bonus: ₹100 CREDIT!
            </span>
          </div>

          {/* Decorative background element */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* --- Right Column: Interactive Form --- */}
        <div className="w-full md:w-1/2 p-12 md:p-20 bg-white flex flex-col justify-center">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-10">Account Setup</h3>
          
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-2">Display Name</label>
              <div className="relative group">
                <input 
                  required placeholder="Enter your full name"
                  className="w-full p-4 pl-12 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 transition-all outline-none font-bold text-gray-700"
                  value={name} onChange={(e) => setName(e.target.value)}
                />
                <UserPlus size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-2">Email Address</label>
              <div className="relative group">
                <input 
                  type="email" required placeholder="name@example.com"
                  className="w-full p-4 pl-12 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 transition-all outline-none font-bold text-gray-700"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-2">Create Password</label>
              <div className="relative group">
                <input 
                  type="password" required placeholder="Choose a secure password"
                  className="w-full p-4 pl-12 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 transition-all outline-none font-bold text-gray-700"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50 flex flex-col sm:flex-row gap-6 justify-between items-center">
               <p className="text-sm font-medium text-gray-400 text-center sm:text-left">
                 Already a member? <br />
                 <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign in to your account</Link>
               </p>
               <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-black transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 w-full sm:w-auto justify-center shadow-xl shadow-gray-200"
               >
                 {isSubmitting ? "Processing..." : "Create Account"} <ArrowRight size={20} />
               </button>
            </div>
          </form>
        </div>
      </div>

      {/* --- SUCCESS MODAL POPUP --- */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-6 animate-in fade-in duration-300">
          <div className="bg-white p-12 rounded-[3rem] text-center shadow-2xl border border-white relative animate-in zoom-in-95 duration-500 max-w-lg w-full">
            
            <div className="h-24 w-24 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
              <CheckCircle size={56} strokeWidth={2.5} />
            </div>

            <h4 className="text-4xl font-black text-gray-900 leading-none mb-4 tracking-tighter">Welcome Aboard!</h4>
            
            <p className="text-gray-500 font-medium leading-relaxed mb-10">
              Your registration was successful. We've added a <strong>₹100 bonus</strong> to your wallet to get you started. 
            </p>
            
            <button 
              onClick={() => navigate("/login")}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-100"
            >
              Go to Login <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}