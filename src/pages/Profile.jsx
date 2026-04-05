import { useEffect, useState } from "react";
import { supabase, signOut } from "../services/supabase";
import { useNavigate } from "react-router-dom";
import { 
  User, Mail, LogOut, TrainFront, 
  Bus, MapPin, Receipt, CreditCard 
} from "lucide-react";

function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [trips, setTrips] = useState([]);
  const [tolls, setTolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
  }, []);

  async function fetchProfileData() {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (authUser) {
      // 1. Get User Info
      const { data: profile } = await supabase.from("users").select("*").eq("user_id", authUser.id).single();
      setUser(profile || { name: "User", email: authUser.email });

      // 2. Get Detailed Transit History
      const { data: transitData } = await supabase.from("transit").select("*").eq("user_id", authUser.id).order("created_at", { ascending: false });
      setTrips(transitData || []);

      // 3. Get Toll History from Transactions
      const { data: tollData } = await supabase.from("transactions").select("*").eq("user_id", authUser.id).eq("type", "toll").order("created_at", { ascending: false });
      setTolls(tollData || []);
    }
    setLoading(false);
  }

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  if (loading) return <div className="p-10 text-center font-bold text-gray-400">Loading Profile...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 animate-in fade-in duration-700">
      
      {/* Account Section */}
      <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-50 mb-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg">
            {user.name[0]}
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-800">{user.name}</h2>
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <Mail size={16} /> <span>{user.email}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-8 py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all border border-red-100"
        >
          <LogOut size={20} /> Logout Account
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Metro/Bus Trip History */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <MapPin className="text-blue-500" /> Recent Trips (Metro & Bus)
          </h3>
          <div className="space-y-4">
            {trips.length > 0 ? trips.map((trip) => (
              <div key={trip.transit_id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex justify-between items-center group hover:border-blue-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    {trip.transport_type === "Metro" ? <TrainFront size={20}/> : <Bus size={20}/>}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{trip.from_station} → {trip.to_station}</p>
                    <p className="text-xs text-gray-400 font-medium">
                      Ticket: {trip.ticket_id} • {new Date(trip.created_at).toLocaleDateString('en-IN')} • {new Date(trip.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </p>
                  </div>
                </div>
                <span className="font-black text-gray-800">₹{trip.fare}</span>
              </div>
            )) : (
              <p className="p-10 text-center bg-gray-50 rounded-3xl text-gray-400 italic">No trips recorded yet.</p>
            )}
          </div>
        </div>

        {/* Toll Transaction History */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <Receipt className="text-cyan-500" /> Toll Activity
          </h3>
          <div className="space-y-4">
            {tolls.length > 0 ? tolls.map((toll) => (
              <div key={toll.transaction_id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex justify-between items-center hover:border-cyan-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl">
                    <CreditCard size={20}/>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 uppercase tracking-tighter">Automated Toll Payment</p>
                    <p className="text-xs text-gray-400 font-medium">
                      {new Date(toll.created_at).toLocaleDateString('en-IN')} • {new Date(toll.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </p>
                  </div>
                </div>
                <span className="font-black text-red-500">-₹{Math.abs(toll.amount)}</span>
              </div>
            )) : (
              <p className="p-10 text-center bg-gray-50 rounded-3xl text-gray-400 italic">No toll payments found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;