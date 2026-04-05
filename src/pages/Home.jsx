import { Link } from "react-router-dom";
import { ArrowRight, Gift, Zap, Shield, Globe, MousePointerClick } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 font-sans">
      {/* 🌌 Modern Mesh Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-200/40 rounded-full blur-[130px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/30 rounded-full blur-[130px] -z-10"></div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-8 max-w-7xl mx-auto relative z-10">
        <h1 className="text-2xl font-black text-gray-900 tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg shadow-lg shadow-blue-200"></div> 
          OmniTransit
        </h1>
        
        <div className="hidden md:flex gap-10 font-bold text-gray-500">
          <Link to="/how-it-works" className="hover:text-blue-600 transition-colors">Process</Link>
          <Link to="/faq" className="hover:text-blue-600 transition-colors">Questions</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/login" className="font-bold text-gray-600 hover:text-blue-600 transition">Login</Link>
          <Link to="/register" className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold shadow-2xl hover:bg-black hover:scale-105 transition-all duration-300">
            Join Now
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-10 pt-20 pb-32 flex flex-col items-center text-center relative z-10">
        
        {/* 🎁 Signup Bonus Badge */}
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-blue-100 px-5 py-2 rounded-full shadow-sm mb-10 animate-bounce cursor-default">
          <Gift size={18} className="text-blue-600" />
          <span className="text-sm font-black text-blue-700 uppercase tracking-widest">
            Welcome Offer: Get ₹100 bonus on signup!
          </span>
        </div>

        <h1 className="text-8xl font-black text-gray-900 leading-[0.85] mb-8 tracking-tighter">
          Smart Travel. <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">
            Simplified.
          </span>
        </h1>

        <p className="text-xl text-gray-500 max-w-2xl mb-12 font-medium leading-relaxed">
          The all-in-one digital wallet for the modern commuter. Manage tolls, 
          metro rides, and bus fares without ever slowing down.
        </p>

        <div className="flex flex-col md:flex-row gap-5 mb-20">
          <Link to="/register" className="px-12 py-5 bg-blue-600 text-white rounded-[2rem] font-black flex items-center gap-3 hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all active:scale-95">
            Get Started <ArrowRight size={22} />
          </Link>
          <Link to="/how-it-works" className="px-12 py-5 bg-white/50 backdrop-blur-md border border-gray-200 text-gray-700 rounded-[2rem] font-black hover:bg-white transition-all shadow-sm">
            See Process
          </Link>
        </div>

        {/* 🛠 Interactive "How It Works" Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-10">
          {[
            { icon: <Zap className="text-blue-500" />, title: "Instant RFID", desc: "No-stop toll payments." },
            { icon: <Shield className="text-emerald-500" />, title: "Bank-Grade", desc: "Secure encrypted logs." },
            { icon: <Globe className="text-purple-500" />, title: "Global Ready", desc: "Multi-city integration." }
          ].map((feature, i) => (
            <div key={i} className="p-10 bg-white/40 backdrop-blur-lg rounded-[2.5rem] border border-white/60 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-all duration-500 group">
              <div className="mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-lg font-black text-gray-800">{feature.title}</h3>
              <p className="text-gray-500 text-sm font-medium mt-1">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}