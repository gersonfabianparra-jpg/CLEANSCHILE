"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Car, CheckCheck, Loader2 } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function AdminMensajes() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/contacts");
    const data = await res.json();
    setContacts(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  const markRead = async (id: string) => {
    await fetch("/api/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: true }),
    });
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, read: true } : c)));
  };

  const handleSelect = (c: Contact) => {
    setSelected(c);
    if (!c.read) markRead(c.id);
  };

  const unread = contacts.filter((c) => !c.read).length;

  return (
    <div className="p-8 h-full">
      <div className="mb-6">
        <h1 className="font-bebas text-4xl text-white tracking-wider">MENSAJES</h1>
        <p className="font-inter text-white/40 text-sm mt-1">
          {contacts.length} total · <span className="text-electric-blue">{unread} sin leer</span>
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 size={24} className="animate-spin text-electric-blue" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-200px)]">
          {/* List */}
          <div className="overflow-y-auto space-y-2 pr-2">
            {contacts.length === 0 ? (
              <p className="text-center py-12 text-white/25 font-inter text-sm">No hay mensajes.</p>
            ) : (
              contacts.map((c) => (
                <motion.button
                  key={c.id}
                  layout
                  onClick={() => handleSelect(c)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    selected?.id === c.id
                      ? "bg-electric-blue/10 border-electric-blue/30"
                      : "bg-black-card border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${c.read ? "bg-white/10" : "bg-electric-blue animate-pulse"}`} />
                    <span className="font-space font-semibold text-white text-sm">{c.name}</span>
                    {c.service && (
                      <span className="ml-auto px-2 py-0.5 rounded-full bg-white/5 text-white/35 text-xs font-space">
                        {c.service}
                      </span>
                    )}
                  </div>
                  <p className="font-inter text-white/40 text-xs truncate ml-5">{c.message}</p>
                  <p className="font-inter text-white/20 text-xs ml-5 mt-1">
                    {new Date(c.createdAt).toLocaleDateString("es-CL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </motion.button>
              ))
            )}
          </div>

          {/* Detail */}
          <div className="overflow-y-auto">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 rounded-2xl bg-black-card border border-white/5 h-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-space font-bold text-white text-lg">{selected.name}</h2>
                    <p className="font-inter text-white/30 text-xs mt-0.5">
                      {new Date(selected.createdAt).toLocaleDateString("es-CL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  {selected.read && (
                    <span className="flex items-center gap-1 text-green-400 text-xs font-space">
                      <CheckCheck size={13} /> Leído
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: Mail, label: selected.email, href: `mailto:${selected.email}` },
                    ...(selected.phone ? [{ icon: Phone, label: selected.phone, href: `tel:${selected.phone}` }] : []),
                    ...(selected.service ? [{ icon: Car, label: selected.service, href: undefined }] : []),
                  ].map(({ icon: Icon, label, href }) => (
                    <div key={label} className="flex items-center gap-3">
                      <Icon size={14} className="text-white/30 shrink-0" />
                      {href ? (
                        <a href={href} className="font-inter text-electric-blue text-sm hover:underline">{label}</a>
                      ) : (
                        <span className="font-inter text-white/60 text-sm">{label}</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-black-deep border border-white/5">
                  <p className="font-inter text-white/60 text-sm leading-relaxed">{selected.message}</p>
                </div>

                <div className="mt-5 flex gap-3">
                  <a
                    href={`mailto:${selected.email}?subject=Re: Consulta CleanSchile`}
                    className="flex-1 text-center py-2.5 rounded-xl bg-electric-blue/10 border border-electric-blue/20 text-electric-blue font-space text-sm hover:bg-electric-blue/15 transition-all"
                  >
                    Responder por Email
                  </a>
                  {selected.phone && (
                    <a
                      href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] font-space text-sm hover:bg-[#25D366]/15 transition-all"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-white/20 font-inter text-sm">
                Selecciona un mensaje para ver el detalle
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
