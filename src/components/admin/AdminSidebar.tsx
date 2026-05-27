"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Star, MessageSquare, Settings, FileEdit, LogOut, ExternalLink, Menu, X } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/resenas", label: "Reseñas", icon: Star },
  { href: "/admin/mensajes", label: "Mensajes", icon: MessageSquare },
  { href: "/admin/contenido", label: "Contenido", icon: FileEdit },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {/* Logo */}
      <div className="p-5 border-b border-white/5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={onClose}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric-blue to-electric-purple flex items-center justify-center shrink-0">
            <span className="font-bebas text-sm text-white">C</span>
          </div>
          <div>
            <span className="font-bebas text-base tracking-widest gradient-text-gold">CLEANS CHILE</span>
            <p className="font-space text-white/25 text-[9px] tracking-widest uppercase leading-none">Admin Panel</p>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors p-1">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-space text-sm transition-all duration-200 ${
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
      <div className="p-3 border-t border-white/5 space-y-1">
        <Link
          href="/"
          target="_blank"
          onClick={onClose}
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
    </>
  );
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Mobile top bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14"
        style={{ background: "rgba(10,10,26,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-electric-blue to-electric-purple flex items-center justify-center">
            <span className="font-bebas text-xs text-white">C</span>
          </div>
          <span className="font-bebas text-sm tracking-widest gradient-text-gold">CLEANS CHILE</span>
        </div>
        <button onClick={() => setOpen(true)} className="text-white/60 hover:text-white transition-colors p-1">
          <Menu size={20} />
        </button>
      </div>

      {/* ── Mobile drawer overlay ── */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-72 max-w-[85vw] flex flex-col"
            style={{ background: "#0A0A1A", borderRight: "1px solid rgba(255,255,255,0.07)" }}>
            <SidebarContent onClose={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col min-h-screen"
        style={{ background: "#0A0A1A", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
        <SidebarContent />
      </aside>
    </>
  );
}
