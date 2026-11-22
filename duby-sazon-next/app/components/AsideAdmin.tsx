import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

import Link from "next/link";

export function AsideAdmin() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-violet-800 p-5 backdrop-blur-md lg:flex lg:flex-col">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div>
          <p className="font-bold text-white">Administración</p>
          <p className="text-xs text-violet-300">Panel de control</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          href="/admin"
          className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-violet-950 shadow-lg"
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>

        <Link
          href="/admin/users"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-violet-200 transition hover:bg-white/10 hover:text-white"
        >
          <Users className="h-5 w-5" />
          Usuarios
        </Link>

        <Link
          href="/admin/content"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-violet-200 transition hover:bg-white/10 hover:text-white"
        >
          <FileText className="h-5 w-5" />
          Contenido
        </Link>

        <Link
          href="/admin/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-violet-200 transition hover:bg-white/10 hover:text-white"
        >
          <Settings className="h-5 w-5" />
          Configuración
        </Link>
      </nav>

      <div className="mt-auto">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-violet-300 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          Salir
        </Link>
      </div>
    </aside>
  );
}
