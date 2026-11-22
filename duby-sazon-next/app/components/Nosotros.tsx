import Image from "next/image";
import { kicker, wrap } from "../lib/styles";

const PUNTOS = [
  "Mercado fresco, comprado cada madrugada",
  "Recetas de familia, sin fórmulas ni atajos",
  "Porciones generosas, como en casa",
];

export default function Nosotros() {
  return (
    <section className="bg-cream-2 py-24" id="nosotros">
      <div
        className={`${wrap} grid grid-cols-1 items-center gap-14 md:grid-cols-[0.85fr_1.15fr]`}
      >
        <div className="relative order-2 aspect-[4/5] overflow-hidden rounded-[28px] shadow-soft md:order-1">
          <Image
            src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=900&auto=format&fit=crop"
            alt="Doña Duby preparando comida casera en la cocina"
            fill
            sizes="(max-width: 960px) 100vw, 460px"
            className="object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
          <p className={kicker}>La sazón tiene nombre propio</p>
          <h2 className="mb-[18px] max-w-[16ch] font-display text-[clamp(1.8rem,3vw,2.3rem)] font-semibold text-purple-deep">
            Doña Duby lleva la cocina en la sangre
          </h2>
          <p className="max-w-[48ch] text-[1.02rem] leading-relaxed text-ink-soft">
            Todo empezó en su cocina, cocinando para la familia y los
            vecinos que pasaban a saludar. Hoy ese mismo fogón alimenta a
            todo el barrio, con las mismas ollas de siempre y la misma
            paciencia para dejar que cada plato tome su tiempo.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {PUNTOS.map((punto) => (
              <li
                key={punto}
                className="flex items-start gap-3 font-medium text-purple-deep"
              >
                <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-orange" />
                {punto}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
