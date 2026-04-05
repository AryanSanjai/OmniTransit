import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../services/supabase";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const u = await getUser();
    setUser(u);
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;