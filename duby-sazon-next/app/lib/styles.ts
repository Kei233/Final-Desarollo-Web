// Cadenas de utilidades de Tailwind compartidas entre componentes.
// No es CSS custom: son solo combinaciones de clases de Tailwind
// centralizadas para no repetirlas en cada archivo.

export const wrap = "mx-auto max-w-[1180px] px-7";

export const kicker =
  "mb-3.5 font-display text-[1.08rem] italic text-orange";

export const kickerLight =
  "mb-3.5 font-display text-[1.08rem] italic text-yellow";

const btnBase =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-full border-2 border-transparent px-6 py-3.5 text-[0.98rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 select-none";

export const btnPrimary = `${btnBase} bg-orange text-white shadow-[0_14px_28px_-12px_rgba(232,98,44,0.55)] hover:bg-orange-dark`;

export const btnGhost = `${btnBase} border-purple bg-transparent text-purple hover:bg-purple hover:text-white`;

export const btnYellow = `${btnBase} bg-yellow text-purple-deep shadow-[0_14px_28px_-14px_rgba(244,180,26,0.7)] hover:bg-yellow-light`;

export const btnOutlineLight = `${btnBase} border-white/50 bg-transparent text-cream hover:border-cream hover:bg-white/[0.08]`;
