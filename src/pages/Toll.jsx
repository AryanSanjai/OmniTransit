import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { MapPin, Navigation, CreditCard, CheckCircle2, AlertTriangle } from "lucide-react";

function Toll() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [balance, setBalance] = useState(0);
  const [status, setStatus] = useState("idle"); // idle, processing, success, error

  const booths = [
    { id: 1, name: "Mumbai-Pune Expressway", city: "Lonavala" },
    { id: 2, name: "Delhi-Noida Direct Flyway", city: "Noida" },
    { id: 3, name: "Bengaluru-Mysuru Exp", city: "Mandya" }
  ];

  useEffect(() => {
    fetchInitialData();
  }, []);

  async function fetchInitialData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Get Vehicles
      const { data: vData } = await supabase.from("vehicles").select("*").eq("user_id", user.id);
      setVehicles(vData || []);
      
      // Get Wallet Balance
      const { data: wData } = await supabase.from("wallet").select("balance").eq("user_id", user.id).single();
      setBalance(wData?.balance || 0);
    }
  }

  const calculateFee = (vehicle) => {
    if (!vehicle) return 0;
    let fee = vehicle.vehicle_type === "Truck" ? 150 : 50;
    if (vehicle.fuel_type === "Electric") fee = fee * 0.5; // 50% Green Discount
    return fee;
  };

  const handlePayToll = async () => {
    if (!selectedVehicle) return;
    const fee = calculateFee(selectedVehicle);
    
    if (balance < fee) {
      setStatus("error");
      return;
    }

    setStatus("processing");
    const { data: { user } } = await supabase.auth.getUser();

    // 1. Deduct from Wallet
    const { error: walletErr } = await supabase
      .from("wallet")
      .update({ balance: balance - fee })
      .eq("user_id", user.id);

    // 2. Record Transaction
    const { error: txErr } = await supabase.from("transactions").insert([
      {
        user_id: user.id,
        amount: -fee,
        type: "toll",
      }
    ]);

    if (!walletErr && !txErr) {
      setBalance(prev => prev - fee);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-in fade-in duration-700">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Smart Toll Gate</h2>
        <p className="text-gray-500 mt-2 font-medium">Automatic RFID simulation for your registered vehicles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Selection */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-50">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">1. Select Vehicle</h3>
            <div className="space-y-3">
              {vehicles.map(v => (
                <div 
                  key={v.vehicle_id}
                  onClick={() => setSelectedVehicle(v)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                    selectedVehicle?.vehicle_id === v.vehicle_id 
                    ? "border-cyan-500 bg-cyan-50" 
                    : "border-gray-50 hover:border-gray-200"
                  }`}
                >
                  <div>
                    <p className="font-mono font-bold text-gray-800">{v.license_plate}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{v.vehicle_type} • {v.fuel_type}</p>
                  </div>
                  {selectedVehicle?.vehicle_id === v.vehicle_id && <CheckCircle2 size={20} className="text-cyan-500"/>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-50">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">2. Select Toll Booth</h3>
            <select className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 focus:ring-2 focus:ring-cyan-500">
              {booths.map(b => <option key={b.id}>{b.name} ({b.city})</option>)}
            </select>
          </div>
        </div>

        {/* Right: Payment/Summary */}
        <div className="flex flex-col gap-6">
          <div className="bg-gray-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-2">Payment Summary</p>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h4 className="text-4xl font-black">₹{calculateFee(selectedVehicle)}</h4>
                  <p className="text-gray-400 text-sm">Transaction Fee</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase">Current Wallet</p>
                  <p className="font-bold">₹{balance}</p>
                </div>
              </div>

              {selectedVehicle?.fuel_type === "Electric" && (
                <div className="bg-green-500/20 text-green-400 p-3 rounded-xl text-xs font-bold flex items-center gap-2 mb-6">
                   Green Incentive Applied: 50% Off
                </div>
              )}

              <button 
                onClick={handlePayToll}
                disabled={!selectedVehicle || status === "processing"}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-gray-900 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {status === "processing" ? "Scanning RFID..." : "Confirm & Pass"}
              </button>
            </div>
            {/* Visual background element */}
            <div className="absolute -bottom-10 -right-10 opacity-10">
               <Navigation size={200} />
            </div>
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <div className="bg-green-100 text-green-700 p-6 rounded-2xl flex items-center gap-4 animate-in zoom-in-95">
              <CheckCircle2 size={30}/>
              <div>
                <p className="font-bold">Toll Paid Successfully!</p>
                <p className="text-sm opacity-80">Gate Opening... Drive Safe.</p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="bg-red-100 text-red-700 p-6 rounded-2xl flex items-center gap-4">
              <AlertTriangle size={30}/>
              <div>
                <p className="font-bold">Insufficient Balance!</p>
                <p className="text-sm opacity-80">Please recharge your wallet to proceed.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Toll;