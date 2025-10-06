"use client";
import LogoutButton from "@/components/LogoutButton";
import useAuth from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
const { user, loading } = useAuth();
const router = useRouter();
useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return null;

  if (!user) return null; // redirect hone tak blank dikhao
    return (
        <div>
          <h1>Welcome {user.email}</h1>
          <LogoutButton />
        </div>
    )
}
