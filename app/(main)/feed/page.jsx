"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../../hooks/useAuth";


export default function FeedPage() {
  const dummyPosts = [
    { id: 1, author: "Alice", content: "Learning Next.js is fun!" },
    { id: 2, author: "Bob", content: "Firebase Auth is smooth 🔥" },
  ];
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [user, loading, router]);
  
    if (loading) return null;
  
    if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Feed</h1>
      <div className="space-y-4">
        {dummyPosts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-[#1f1f1f] rounded-lg border border-[#2a2a2a]"
          >
            <p className="font-semibold text-2xl">{post.author}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
