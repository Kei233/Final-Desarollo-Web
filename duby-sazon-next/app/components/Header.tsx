"use client";

import { useState } from "react";
import { btnPrimary, wrap } from "../lib/styles";
import Image from "next/image";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { href: "#menu", label: "Menú" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#dia", label: "Plato del día" },
  { href: "#contacto", label: "Contacto" },
  { href: "/admin/login", label: "Admin"},
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-purple/10 bg-cream shadow-md shadow-black/8 p-2 md:p-0">
      <div className={`${wrap} flex items-center gap-6 py-4`}>
        <a
          className="mr-auto flex items-center gap-2.5 h-[5svh] w-1/4 max-h-16 min-h-8 min-w-8"
          href="#inicio"
        >
          <div className="aspect-square min-w-8 w-1/4 relative self-center hidden sm:block">
            <Image
              src={`/duby-sazon-logo.png`}
              alt="logo de duby sazon."
              fill
            />
          </div>
          <span className="font-display text-2xl font-semibold text-purple">
            Duby <em className="text-orange">Sazón</em>
          </span>
        </a>

        <nav
          className={`${
            isOpen ? "flex" : "hidden"
          } absolute inset-x-0 top-full flex-col border-b border-purple/10 bg-cream px-7 pb-5 md:static md:flex md:flex-row md:gap-7 md:border-0 md:bg-transparent md:px-0 md:pb-0`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="group relative block border-b border-purple/5 py-3 font-medium text-ink-soft transition-colors hover:text-purple md:inline-block md:border-0 md:py-1"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-1 hidden h-0.5 origin-left scale-x-0 bg-orange transition-transform duration-200 group-hover:scale-x-100 md:block" />
            </a>
          ))}
        </nav>

        <a href="#pedir" className={`hidden md:inline-flex ${btnPrimary}`}>
          Pedir ahora
        </a>

        <button
          className="flex flex-col gap-1.5 bg-transparent p-1.5 md:hidden"
          aria-label="Abrir menú"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="h-0.5 w-6 rounded bg-purple" />
          <span className="h-0.5 w-6 rounded bg-purple" />
          <span className="h-0.5 w-6 rounded bg-purple" />
        </button>
      </div>
    </header>
  );
}
