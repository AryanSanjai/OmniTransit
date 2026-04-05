import { Link } from "react-router-dom";
import { UserPlus, Wallet, Car, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { title: "Onboarding", desc: "Create your secure account and instantly receive a ₹100 credit bonus in your digital wallet.", icon: <UserPlus />, color: "bg-blue-600" },
    { title: "Fleet Setup", desc: "Register your vehicles. Our system supports Petrol, Diesel, and Electric models with specialized pricing.", icon: <Car />, color: "bg-indigo-600" },
    { title: "Smart Funding", desc: "Top up your wallet using our seamless recharge system. Real-time balance updates across all cities.", icon: <Wallet />, color: "bg-purple-600" },
    { title: "Travel Free", desc: "Pass through tolls or enter metro gates. Our RFID and QR simulation handles the payments automatically.", icon: <CheckCircle />, color: "bg-emerald-600" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-10 md:p-20">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="font-bold text-blue-600 hover:underline mb-12 inline-block">← Back to Terminal</Link>
        <h2 className="text-6xl font-black text-gray-900 mb-6 tracking-tighter">The System Flow</h2>
        <p className="text-gray-500 text-xl max-w-2xl mb-20 font-medium">Built for speed, accuracy, and total user convenience.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200 border border-slate-100 group hover:-translate-y-2 transition-all duration-500">
              <div className={`h-16 w-16 ${step.color} text-white rounded-2xl flex items-center justify-center shadow-lg mb-8 rotate-3 group-hover:rotate-0 transition-transform`}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-4">{i + 1}. {step.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}