import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../service/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import toast from "react-hot-toast";

type User = {
  id: string;
  name: string | null;
  avatar: string | null;
};

type AuntContextProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  singIn: () => void;
  user: User | undefined;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuntContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL } = user;

        if (!displayName) {
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }

      return () => {
        unsubscribe();
      };
    });
  }, []);

  async function singIn() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      const { uid, displayName, photoURL } = result.user;

      if (!displayName) {
        toast.error("Unnamed user!")
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });

      toast.success('Login done successfully!')
      localStorage.setItem("user", JSON.stringify(user));
    }else{
      toast.error("Login error!")
    }

  }

  return (
    <AuthContext.Provider value={{ singIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
