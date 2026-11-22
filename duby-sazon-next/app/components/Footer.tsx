import { wrap } from "../lib/styles";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-purple-deep py-10 text-center text-cream/70">
      <div className={`${wrap} flex flex-col items-center gap-2`}>
        <span className="font-display text-xl text-cream">
          Duby <em className="text-yellow">Sazón</em>
        </span>
        <p>Comida casera hecha con cariño, todos los días.</p>
        <Link className="mt-2.5 text-[1rem] opacity-70 hover:opacity-100 hover:text-white" href="/admin/login">Administrador</Link>
        <p className="mt-2.5 text-[0.82rem] opacity-70">
          © {year} Duby Sazón.
        </p>
      </div>
    </footer>
  );
}
