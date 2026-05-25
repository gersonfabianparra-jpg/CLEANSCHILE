"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Star, MessageSquare, LogOut, ExternalLink } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/resenas", label: "Reseñas", icon: Star },
  { href: "/admin/mensajes", label: "Mensajes", icon: MessageSquare },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 bg-black-card border-r border-white/5 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric-blue to-electric-purple flex items-center justify-center">
            <span className="font-bebas text-sm text-white">C</span>
          </div>
          <span className="font-bebas text-lg tracking-widest gradient-text-gold">CLEANS CHILE</span>
        </Link>
        <p className="font-space text-white/25 text-[10px] tracking-widest uppercase mt-1 ml-10">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-space text-sm transition-all duration-200 ${
                isActive
                  ? "bg-electric-blue/10 text-white border border-electric-blue/20"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={16} className={isActive ? "text-electric-blue" : ""} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-space text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all"
        >
          <ExternalLink size={16} />
          Ver Sitio
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-space text-sm text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut size={16} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
