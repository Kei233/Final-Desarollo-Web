"use client";

import Image from "next/image";
import { btnGhost, btnPrimary, kicker, wrap } from "../lib/styles";

import { useRef } from "react";

import gsap from "gsap";

import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const title = new SplitType(".titleHero");

      const tl = gsap.timeline();

      tl.to(title.chars, {
        y: "-=5",
        duration: 0.48,
        stagger: 0.12,
        ease: "sine.in",
      })
        .to(
          title.chars,
          {
            y: "+=5",
            duration: 0.48,
            stagger: 0.12,
            ease: "sine.in",
          },
          "<-0.6",
        )
        .to(".tag", {
          y: () => "+=" + gsap.utils.random(-20, 20),
          duration: 6,
          ease: "sine.in",
        }, 0)
        .to(".tag", {
          x: () => "+=" + gsap.utils.random(-10, 10),
          duration: 3,
          ease: "sine.out",
        }, ">")
        .add(() => tl.play(0));
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className="overflow-hidden py-20 md:py-24"
      id="inicio"
    >
      <div
        className={`${wrap} grid grid-cols-1 items-center gap-14 md:grid-cols-[1.05fr_0.95fr]`}
      >
        <div>
          <p className={`${kicker}`}>Cocina de casa, hecha con cariño</p>
          <h1 className="titleHero max-w-[12ch] font-display text-[clamp(2.3rem,4vw,3.2rem)] font-semibold leading-[1.08] text-purple-deep">
            El sabor de una comida casera en cualquier lugar.
          </h1>
          <p className="mt-5 max-w-[46ch] text-[1.06rem] leading-relaxed text-ink-soft">
            Desayunos, almuerzos y comidas caseras preparados cada día con
            ingredientes frescos y esa sazón que solo se consigue a fuego lento.
            Pide ahora y te lo llevamos calientico.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#menu" className={btnPrimary}>
              Ver el menú
            </a>
            <a
              href="https://wa.me/573000000000"
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnGhost} group`}
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                className="group-hover:text-green-600"
              >
                <title>WhatsApp</title>
                <path
                  fill="currentColor"
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                />
              </svg>
              Pedir por WhatsApp
            </a>
          </div>
          <div className="mt-12 flex flex-wrap gap-8">
            <div className="flex flex-col gap-1">
              <strong className="font-display text-xl text-purple">
                +4 años
              </strong>
              <span className="text-[0.86rem] text-ink-soft">
                sirviendo en el barrio
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <strong className="font-display text-xl text-purple">
                100% casera
              </strong>
              <span className="text-[0.86rem] text-ink-soft">
                sin atajos, sin congelados
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <strong className="font-display text-xl text-purple">
                4.8 ★
              </strong>
              <span className="text-[0.86rem] text-ink-soft">
                de vecinos felices
              </span>
            </div>
          </div>
        </div>

        <div
          className="relative flex min-h-[340px] items-center justify-center md:min-h-[420px]"
          aria-hidden="true"
        >
          <div className="absolute inset-[6%_4%] rounded-[62%_38%_55%_45%/48%_42%_58%_52%] bg-[linear-gradient(150deg,#F4B41A_0%,#E8622C_55%,#4B1F63_130%)]" />
          <div className="relative aspect-square w-[82%] overflow-hidden rounded-[62%_38%_55%_45%/48%_42%_58%_52%] border-[6px] border-cream shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=900&auto=format&fit=crop"
              alt=""
              fill
              sizes="(max-width: 960px) 90vw, 480px"
              className="object-cover"
              priority
            />
          </div>
          <div className="tag absolute right-[2%] top-[6%] rounded-full bg-white px-4 py-2.5 text-[0.86rem] font-semibold text-purple-deep shadow-soft">
            🌽 Sopa del día
          </div>
          <div className="tag absolute bottom-[8%] left-[-2%] rounded-full bg-white px-4 py-2.5 text-[0.86rem] font-semibold text-purple-deep shadow-soft">
            ☕ Desayunos desde las 7 a.m.
          </div>
        </div>
      </div>
    </section>
  );
}
