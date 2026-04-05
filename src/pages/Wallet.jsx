import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { 
  Wallet as WalletIcon, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  CreditCard,
  Loader2
} from "lucide-react";

function Wallet() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchWalletData();
  }, []);

  async function fetchWalletData() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // 1. Fetch Current Balance
      const { data: walletData, error: wError } = await supabase
        .from("wallet")
        .select("balance")
        .eq("user_id", user.id)
        .single();
      
      if (!wError) setBalance(walletData?.balance || 0);

      // 2. Fetch Transaction History
      const { data: txData, error: tError } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!tError) setTransactions(txData || []);
    }
    setLoading(false);
  }

  const handleRecharge = async (amount) => {
    const finalAmount = amount || parseFloat(rechargeAmount);
    if (!finalAmount || finalAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setIsProcessing(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Step 1: Update Wallet Balance
      // This requires the 'UPDATE' RLS policy to be active in Supabase
      const { error: walletError } = await supabase
        .from("wallet")
        .update({ balance: balance + finalAmount })
        .eq("user_id", user.id);

      if (walletError) {
        alert("Wallet Update Failed: " + walletError.message);
        setIsProcessing(false);
        return;
      }

      // Step 2: Record the Recharge Transaction
      const { error: txError } = await supabase
        .from("transactions")
        .insert([
          { 
            user_id: user.id, 
            amount: finalAmount, 
            type: "recharge" 
          }
        ]);

      if (txError) {
        console.error("History Error:", txError.message);
      }

      // Final Step: Success Cleanup
      setRechargeAmount("");
      await fetchWalletData(); // Refresh balance and list
      alert(`Successfully added ₹${finalAmount} to your wallet!`);
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Balance & Quick Actions */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-black p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-2">Total Balance</p>
              <h2 className="text-5xl font-black mb-10 tracking-tight">₹{balance}</h2>
              <div className="flex justify-between items-center opacity-60">
                <p className="text-sm font-medium tracking-wide">OmniTransit Digital ID</p>
                <CreditCard size={24} className="group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
            {/* Design Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-all duration-700"></div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50">
            <h3 className="text-gray-800 font-bold mb-6 flex items-center gap-2">
              <Plus size={20} className="text-cyan-500" /> Fast Recharge
            </h3>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[100, 500, 1000].map(amt => (
                <button 
                  key={amt}
                  disabled={isProcessing}
                  onClick={() => handleRecharge(amt)}
                  className="py-3 bg-gray-50 hover:bg-cyan-500 hover:text-white rounded-2xl font-bold transition-all border border-transparent active:scale-95 disabled:opacity-50"
                >
                  +₹{amt}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <input 
                type="number"
                placeholder="Other amount"
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-cyan-500 font-bold text-gray-700"
                value={rechargeAmount}
                onChange={(e) => setRechargeAmount(e.target.value)}
              />
              <button 
                disabled={isProcessing}
                onClick={() => handleRecharge()}
                className="w-full bg-cyan-500 text-white py-4 rounded-2xl font-black hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-100 flex items-center justify-center gap-2"
              >
                {isProcessing ? <Loader2 className="animate-spin" /> : "Deposit Funds"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Ledger */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-50 overflow-hidden flex flex-col h-full">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <History className="text-blue-500" /> Transaction Ledger
              </h3>
            </div>

            <div className="overflow-y-auto max-h-[600px] divide-y divide-gray-50">
              {loading ? (
                <div className="p-20 text-center flex flex-col items-center gap-4">
                  <Loader2 className="animate-spin text-cyan-500" size={40} />
                  <p className="text-gray-400 font-bold">Syncing with Blockchain...</p>
                </div>
              ) : transactions.length > 0 ? (
                transactions.map((tx) => (
                  <div key={tx.transaction_id} className="p-6 flex justify-between items-center hover:bg-cyan-50/30 transition-colors group">
                    <div className="flex items-center gap-5">
                      <div className={`p-3 rounded-2xl transition-transform group-hover:scale-110 ${
                        tx.type === 'recharge' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {tx.type === 'recharge' ? <ArrowUpRight size={20}/> : <ArrowDownLeft size={20}/>}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 capitalize">{tx.type}</p>
                        <p className="text-xs text-gray-400 font-medium">
                          {new Date(tx.created_at).toLocaleDateString('en-IN')} • {new Date(tx.created_at).toLocaleTimeString('en-IN', {hour: '2-digit', minute:'2-digit', hour12: true})}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xl font-black ${
                      tx.type === 'recharge' ? 'text-green-500' : 'text-gray-900'
                    }`}>
                      {tx.type === 'recharge' ? "+" : "-"}₹{Math.abs(tx.amount)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                    <WalletIcon size={30} />
                  </div>
                  <p className="font-bold text-gray-500 uppercase tracking-widest text-sm">No Activity Recorded</p>
                  <p className="text-gray-400 text-sm mt-1">Recharge to start your journey.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;