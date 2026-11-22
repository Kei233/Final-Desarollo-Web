import { btnOutlineLight, btnYellow, kickerLight, wrap } from "../lib/styles";

const INFO = [
  { icon: "📍", text: "Cra 45 #12–30, Barrio La Milagrosa, Medellín" },
  { icon: "🕒", text: "Lunes a sábado, 7:00 a.m. – 4:00 p.m." },
  { icon: "📞", text: "+57 300 000 0000" },
];

export default function Pedir() {
  return (
    <section className="bg-purple py-24 text-cream" id="pedir">
      <div
        className={`${wrap} grid grid-cols-1 items-start gap-12 md:grid-cols-[1.1fr_0.9fr]`}
      >
        <div>
          <p className={kickerLight}>Antójate</p>
          <h2 className="mb-4 max-w-[14ch] font-display text-[clamp(1.9rem,3vw,2.5rem)] font-semibold text-cream">
            ¿Ya sabes qué te vas a comer?
          </h2>
          <p className="max-w-[44ch] text-[1.02rem] leading-relaxed text-cream/80">
            Escríbenos y te confirmamos la hora de entrega. También puedes
            pasar directo al local, siempre hay algo calientico esperando.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <a
              href="https://wa.me/573000000000"
              target="_blank"
              rel="noopener noreferrer"
              className={btnYellow}
            >
              Escribir por WhatsApp
            </a>
            <a href="tel:+573000000000" className={btnOutlineLight}>
              Llamar ahora
            </a>
          </div>
        </div>

        <div
          className="rounded-[28px] border border-white/[0.16] bg-white/[0.06] p-8"
          id="contacto"
        >
          <h3 className="mb-5 font-display text-[1.4rem] text-yellow">
            Duby Sazón
          </h3>
          <ul className="flex flex-col gap-4">
            {INFO.map((item) => (
              <li
                key={item.text}
                className="flex items-start gap-3 text-[0.98rem] leading-relaxed text-cream/90"
              >
                <span className="text-[1.1rem]">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
