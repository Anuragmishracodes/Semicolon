"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/home", label: "Home" },
    { href: "/feed", label: "Feed" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] p-4">
        <h2 className="text-2xl font-bold mb-6">Semicolon</h2>
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md ${
                pathname === item.href ? "bg-purple-600" : "hover:bg-[#2a2a2a]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
