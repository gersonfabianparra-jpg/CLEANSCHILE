import { prisma } from "@/lib/db";
import { Star, MessageSquare, Eye, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  const [totalReviews, totalContacts, unreadContacts, featuredReviews] = await Promise.all([
    prisma.review.count(),
    prisma.contact.count(),
    prisma.contact.count({ where: { read: false } }),
    prisma.review.count({ where: { featured: true } }),
  ]);

  const recentContacts = await prisma.contact.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const stats = [
    { icon: Star, label: "Total Reseñas", value: totalReviews, color: "#C9A84C", sub: `${featuredReviews} destacadas` },
    { icon: MessageSquare, label: "Mensajes", value: totalContacts, color: "#0066FF", sub: `${unreadContacts} sin leer` },
    { icon: Eye, label: "Sin Leer", value: unreadContacts, color: "#FF006E", sub: "requieren atención" },
    { icon: TrendingUp, label: "Destacadas", value: featuredReviews, color: "#7B2FFF", sub: "en la landing" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-bebas text-4xl text-white tracking-wider">DASHBOARD</h1>
        <p className="font-inter text-white/40 text-sm mt-1">Panel de control CleanSchile</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {stats.map(({ icon: Icon, label, value, color, sub }) => (
          <div key={label} className="p-5 rounded-2xl bg-black-card border border-white/5">
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${color}12`, border: `1px solid ${color}20` }}
              >
                <Icon size={18} style={{ color }} />
              </div>
            </div>
            <p className="font-bebas text-4xl text-white">{value}</p>
            <p className="font-space text-white/60 text-sm font-medium">{label}</p>
            <p className="font-inter text-white/25 text-xs mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Recent contacts */}
      <div className="rounded-2xl bg-black-card border border-white/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="font-space font-semibold text-white text-sm">Mensajes Recientes</h2>
          <a href="/admin/mensajes" className="font-space text-electric-blue text-xs hover:underline">
            Ver todos →
          </a>
        </div>
        <div className="divide-y divide-white/5">
          {recentContacts.length === 0 ? (
            <p className="px-6 py-8 text-center font-inter text-white/30 text-sm">
              No hay mensajes aún.
            </p>
          ) : (
            recentContacts.map((c) => (
              <div key={c.id} className="px-6 py-4 flex items-start gap-4">
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${c.read ? "bg-white/10" : "bg-electric-blue"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-space font-medium text-white text-sm">{c.name}</span>
                    {c.service && (
                      <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-xs font-space">
                        {c.service}
                      </span>
                    )}
                  </div>
                  <p className="font-inter text-white/40 text-xs truncate">{c.message}</p>
                </div>
                <span className="font-inter text-white/20 text-xs shrink-0">
                  {new Date(c.createdAt).toLocaleDateString("es-CL")}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
