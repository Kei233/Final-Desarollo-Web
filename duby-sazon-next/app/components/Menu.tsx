import Image from "next/image";
import { kicker, wrap } from "../lib/styles";

const MENU_ITEMS = [
  {
    title: "Desayunos",
    desc: "Calentado, huevos al gusto, caldo de costilla y arepa recién asada. La energía que necesitas para arrancar.",
    price: "Desde $6.000",
    img: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    title: "Almuerzos ejecutivos",
    desc: "Sopa, principio, proteína a elegir, arroz, ensalada y jugo natural. El clásico que nunca falla.",
    price: "Desde $13.000",
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    title: "Comidas caseras",
    desc: "Bandeja paisa, mondongo, ajiaco los viernes y esos platos de olla que saben a domingo en familia.",
    price: "Desde $15.000",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
];

export default function Menu() {
  return (
    <section className="py-24" id="menu">
      <div className={wrap}>
        <div className="mb-12 max-w-[620px]">
          <p className={kicker}>Lo que preparamos</p>
          <h2 className="font-display text-[clamp(1.9rem,3vw,2.5rem)] font-semibold text-purple-deep">
            Un menú pensado para cada momento del día
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {MENU_ITEMS.map((item) => (
            <article
              key={item.title}
              className={`flex flex-col overflow-hidden rounded-[28px] bg-white shadow-soft transition-transform duration-200 hover:-translate-y-1.5 ${
                item.featured ? "border-[3px] border-yellow" : ""
              }`}
            >
              <div className="relative h-[190px] w-full">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 960px) 100vw, 380px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2.5 px-6 pb-7 pt-6">
                <h3 className="font-display text-[1.3rem] text-purple">
                  {item.title}
                </h3>
                <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                  {item.desc}
                </p>
                <span className="text-[0.95rem] font-bold text-orange">
                  {item.price}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
