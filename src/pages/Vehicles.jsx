import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { Car, Truck, Bike, Plus, Trash2, ShieldCheck, Zap, Fuel } from "lucide-react";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [plate, setPlate] = useState("");
  const [type, setType] = useState("Car");
  const [fuelType, setFuelType] = useState("Petrol");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("vehicles")
        .select("*")
        .eq("user_id", user.id);
      setVehicles(data || []);
    }
    setLoading(false);
  }

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { error } = await supabase.from("vehicles").insert([
        { 
          user_id: user.id, 
          license_plate: plate.toUpperCase(), 
          vehicle_type: type,
          fuel_type: fuelType // Saving the new fuel/electric data
        }
      ]);

      if (error) {
        alert(error.message);
      } else {
        setPlate("");
        setShowForm(false);
        fetchVehicles();
      }
    }
    setIsSubmitting(false);
  };

  const deleteVehicle = async (id) => {
    if (window.confirm("Remove this vehicle from your wallet?")) {
      await supabase.from("vehicles").delete().eq("vehicle_id", id);
      fetchVehicles();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Garage</h2>
          <p className="text-gray-500 mt-2 font-medium">Manage your fleet and fuel preferences.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
            showForm ? 'bg-gray-100 text-gray-600' : 'bg-cyan-500 text-white shadow-lg shadow-cyan-200 hover:bg-cyan-600'
          }`}
        >
          {showForm ? "Cancel" : <><Plus size={20}/> Register Vehicle</>}
        </button>
      </div>

      {/* Add Vehicle Form */}
      {showForm && (
        <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-cyan-50 mb-10">
          <form onSubmit={handleAddVehicle} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase">Plate Number</label>
              <input 
                required placeholder="TN 01 AB 1234"
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-cyan-500 font-mono"
                value={plate} onChange={(e) => setPlate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase">Category</label>
              <select className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700"
                value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Truck">Truck</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase">Engine/Fuel</label>
              <select className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700"
                value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric (EV)</option>
              </select>
            </div>
            <button disabled={isSubmitting} className="bg-gray-900 text-white p-4 rounded-2xl font-black hover:bg-black transition-all">
              {isSubmitting ? "Saving..." : "Add to Garage"}
            </button>
          </form>
        </div>
      )}

      {/* Vehicle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {vehicles.map((v) => (
          <div key={v.vehicle_id} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50 group relative">
            <div className="flex justify-between mb-6">
              <div className={`p-4 rounded-2xl ${v.fuel_type === 'Electric' ? 'bg-green-50 text-green-600' : 'bg-cyan-50 text-cyan-600'}`}>
                {v.vehicle_type === "Truck" ? <Truck /> : v.vehicle_type === "Bike" ? <Bike /> : <Car />}
              </div>
              <button onClick={() => deleteVehicle(v.vehicle_id)} className="text-gray-200 hover:text-red-500 transition-colors">
                <Trash2 size={20}/>
              </button>
            </div>

            <h3 className="text-2xl font-mono font-bold text-gray-800 mb-2">{v.license_plate}</h3>
            
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-gray-100 text-gray-500 rounded-full">
                {v.vehicle_type}
              </span>
              {v.fuel_type === "Electric" ? (
                <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-green-100 text-green-600 rounded-full">
                  <Zap size={10} fill="currentColor"/> EV
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-orange-100 text-orange-600 rounded-full">
                  <Fuel size={10}/> {v.fuel_type}
                </span>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center gap-2 text-green-600 text-xs font-bold">
              <ShieldCheck size={16}/> Ready for Smart Tolls
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vehicles;