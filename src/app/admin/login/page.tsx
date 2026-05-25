"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.ok) {
      router.push("/admin");
    } else {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-black-deep flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-electric-blue/8 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-electric-purple/5 via-transparent to-transparent translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-blue to-electric-purple flex items-center justify-center">
              <span className="font-bebas text-lg text-white">C</span>
            </div>
            <span className="font-bebas text-2xl tracking-widest gradient-text-gold">CLEANS CHILE</span>
          </div>
          <p className="font-space text-white/30 text-xs tracking-widest uppercase">Panel de Administración</p>
        </div>

        {/* Card */}
        <div className="relative p-8 rounded-3xl bg-black-card border border-white/5 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-electric-blue/60 to-transparent" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center">
              <Lock size={16} className="text-electric-blue" />
            </div>
            <div>
              <h1 className="font-space font-bold text-white text-base">Iniciar Sesión</h1>
              <p className="font-inter text-white/30 text-xs">Solo para administradores</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-space text-white/40 text-xs mb-2 tracking-wider">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cleanschile.cl"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black-deep border border-white/8 text-white text-sm font-inter placeholder:text-white/20 focus:border-electric-blue/50 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-space text-white/40 text-xs mb-2 tracking-wider">Contraseña</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-black-deep border border-white/8 text-white text-sm font-inter placeholder:text-white/20 focus:border-electric-blue/50 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-xs font-inter"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative py-3.5 rounded-xl font-space font-semibold text-sm overflow-hidden group disabled:opacity-70 mt-2"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-electric-blue to-electric-purple" />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
                {loading ? "Verificando..." : "Ingresar"}
              </span>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
