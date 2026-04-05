import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [active, setActive] = useState(null);
  
  const data = [
    { 
      q: "Is the ₹100 bonus available for everyone?", 
      a: "Yes! Every new user registered in our network receives an automatic ₹100 bonus to start their journey." 
    },
    { 
      q: "How do Electric Vehicle discounts work?", 
      a: "Our system automatically detects if your vehicle is 'Electric' and applies a 50% discount to all toll transactions." 
    },
    { 
      q: "Can I use OmniTransit in multiple cities?", 
      a: "OmniTransit is a multi-city network. One wallet works for tolls, metro, and bus transit across all supported regions." 
    },
    { 
      q: "What if my balance is low at a toll gate?", 
      a: "The gate simulation will notify you of 'Insufficient Balance'. You can quickly recharge via the Wallet tab in seconds." 
    }
  ];

  return (
    <div className="min-h-screen bg-white p-10 md:p-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="font-bold text-blue-600 hover:underline mb-12 inline-block">
          ← Back to Terminal
        </Link>
        
        <div className="flex items-center gap-4 mb-12">
          <HelpCircle size={40} className="text-blue-600" />
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter">Questions</h2>
        </div>

        <div className="space-y-4">
          {data.map((item, i) => (
            <div 
              key={i} 
              className={`rounded-3xl border transition-all duration-300 ${
                active === i ? 'border-blue-200 bg-blue-50/30 shadow-sm' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <button 
                onClick={() => setActive(active === i ? null : i)} 
                className="w-full p-8 flex justify-between items-center text-left"
              >
                <span className="text-lg font-bold text-gray-800">{item.q}</span>
                {active === i ? (
                  <Minus size={20} className="text-blue-600" />
                ) : (
                  <Plus size={20} className="text-gray-300" />
                )}
              </button>
              {active === i && (
                <div className="px-8 pb-8 text-gray-500 font-medium animate-in fade-in slide-in-from-top-2">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}