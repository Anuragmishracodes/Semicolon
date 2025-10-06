"use client";

import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login"); // logout ke baad login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-fit h-11 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
