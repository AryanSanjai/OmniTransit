import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
console.log(import.meta.env);

//  SIGN UP
export const signUp = async (email, password) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

//  LOGIN
export const signIn = async (email, password) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

//  LOGOUT
export const signOut = async () => {
  return await supabase.auth.signOut();
};

//  GET USER
export const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};