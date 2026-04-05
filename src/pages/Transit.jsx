import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { 
  TrainFront, 
  Bus, 
  QrCode, 
  ArrowRight, 
  AlertCircle,
  Ticket as TicketIcon,
  Loader2
} from "lucide-react";

function Transit() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState("idle"); 
  const [ticket, setTicket] = useState(null);

  // Form State
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = useState("Metro");

  const stations = ["Chennai Central", "Guindy", "Tambaram", "Airport", "Egmore", "Koyambedu"];
  const fare = type === "Metro" ? 40 : 25;

  useEffect(() => {
    fetchBalance();
  }, []);

  async function fetchBalance() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from("wallet").select("balance").eq("user_id", user.id).single();
      setBalance(data?.balance || 0);
    }
    setLoading(false);
  }

  const handleBookTicket = async () => {
    if (!from || !to || from === to) {
      alert("Please select a valid route.");
      return;
    }

    if (balance < fare) {
      setBookingStatus("error");
      return;
    }

    setBookingStatus("processing");
    const { data: { user } } = await supabase.auth.getUser();
    const newTicketId = Math.random().toString(36).toUpperCase().substring(2, 10);

    // 1. Deduct from Wallet
    const { error: walletErr } = await supabase
      .from("wallet")
      .update({ balance: balance - fare })
      .eq("user_id", user.id);

    // 2. Record Financial Transaction (For your Ledger)
    const { error: txErr } = await supabase.from("transactions").insert([
      { user_id: user.id, amount: -fare, type: "transit" }
    ]);

    // 3. Record Transit Journey Details (For your Transit Table)
    const { error: transitErr } = await supabase.from("transit").insert([
      {
        user_id: user.id,
        from_station: from,
        to_station: to,
        transport_type: type,
        fare: fare,
        ticket_id: newTicketId
      }
    ]);

    if (!walletErr && !txErr && !transitErr) {
      setBalance(prev => prev - fare);
      setTicket({ 
        from, to, type, fare, 
        // Updated localized time formatting
        date: new Date().toLocaleString('en-IN', { 
          day: '2-digit', 
          month: 'short', 
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: true 
        }), 
        id: newTicketId 
      });
      setBookingStatus("success");
    } else {
      setBookingStatus("error");
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-gray-400">Syncing Transit Systems...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 animate-in fade-in duration-700">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Public Transit</h2>
        <p className="text-gray-500 mt-2 font-medium">Book seamless Metro and Bus rides with your OmniTransit ID.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Booking Interface */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8">New Booking</h3>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <button 
                onClick={() => setType("Metro")}
                className={`flex-1 p-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${type === "Metro" ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
              >
                <TrainFront size={20}/> Metro
              </button>
              <button 
                onClick={() => setType("Bus")}
                className={`flex-1 p-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${type === "Bus" ? "bg-orange-500 text-white shadow-lg shadow-orange-100" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
              >
                <Bus size={20}/> Bus
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase ml-2">Origin Station</label>
              <select 
                className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 focus:ring-2 focus:ring-blue-500"
                value={from} onChange={(e) => setFrom(e.target.value)}
              >
                <option value="">Select Origin</option>
                {stations.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase ml-2">Destination</label>
              <select 
                className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 focus:ring-2 focus:ring-blue-500"
                value={to} onChange={(e) => setTo(e.target.value)}
              >
                <option value="">Select Destination</option>
                {stations.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Fare Amount</p>
                <h4 className="text-2xl font-black text-gray-800">₹{fare}</h4>
              </div>
              <button 
                onClick={handleBookTicket}
                disabled={bookingStatus === "processing"}
                className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-black transition-all flex items-center gap-2"
              >
                {bookingStatus === "processing" ? <Loader2 className="animate-spin" /> : "Confirm Ticket"}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Ticket Display */}
        <div className="flex flex-col">
          {bookingStatus === "success" && ticket ? (
            <div className="bg-gradient-to-br from-indigo-600 to-blue-800 p-8 rounded-[2.5rem] text-white shadow-2xl animate-in zoom-in-95 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <QrCode size={40} className="p-2 bg-white/20 rounded-xl" />
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase opacity-60">Journey ID</p>
                    <p className="font-mono font-bold tracking-tighter">#{ticket.id}</p>
                  </div>
                </div>

                <div className="space-y-8 mb-10">
                  <div className="flex justify-between items-center relative">
                    <div className="z-10">
                      <p className="text-[10px] font-black uppercase opacity-60">From</p>
                      <h4 className="text-lg font-bold">{ticket.from}</h4>
                    </div>
                    <ArrowRight className="opacity-30 absolute left-1/2 -translate-x-1/2" />
                    <div className="text-right z-10">
                      <p className="text-[10px] font-black uppercase opacity-60">To</p>
                      <h4 className="text-lg font-bold">{ticket.to}</h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                    <div>
                      <p className="text-[10px] font-black uppercase opacity-60">Mode</p>
                      <p className="font-bold flex items-center gap-2">
                        {ticket.type === "Metro" ? <TrainFront size={14}/> : <Bus size={14}/>} {ticket.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase opacity-60">Status</p>
                      <p className="font-bold text-emerald-400">Paid & Active</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm flex justify-between items-center">
                    <p className="text-xs font-medium opacity-70">{ticket.date}</p>
                    <p className="font-black text-xl tracking-tight">₹{ticket.fare}</p>
                </div>
              </div>
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
            </div>
          ) : bookingStatus === "error" ? (
            <div className="bg-red-50 border border-red-100 p-10 rounded-[2.5rem] text-center flex flex-col items-center justify-center flex-1">
              <AlertCircle size={48} className="text-red-500 mb-4" />
              <h4 className="text-xl font-bold text-red-800">Payment Failed</h4>
              <p className="text-red-600/70 mt-2 font-medium italic">Balance: ₹{balance} | Required: ₹{fare}</p>
              <p className="text-red-400 text-sm mt-1">Please add funds to your digital wallet.</p>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2.5rem] flex-1 flex flex-col items-center justify-center p-10 text-center">
              <TicketIcon size={64} className="text-gray-200 mb-4" />
              <h4 className="text-gray-400 font-bold uppercase tracking-widest text-sm">Ticket Queue Empty</h4>
              <p className="text-gray-400 text-sm mt-2">Ready to travel? Select a route to generate your boarding pass.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transit;