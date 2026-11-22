"use client";

import Image from "next/image";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import { btnYellow, kickerLight, wrap } from "../lib/styles";

interface Menu {
  menu: string;
  imagen?: string | null;
  imagenExtra?: string | null;
}

interface Props {
  menu: Menu | null;
  error: string | null;
}

export default function PlatoDelDiaClient({ menu, error }: Props) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center 60%",
          once: true,
        },
      });

      // 1. Entrada del contenido
      tl.from("[data-animate='text']", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
      });

      // 2. Reveal de la fotografía principal
      tl.from(
        "[data-animate='image']",
        {
          clipPath: "inset(100% 0 0 0 round 2rem)",
          duration: 1.2,
          ease: "power4.inOut",
        },
        "-=0.65",
      );

      // 3. Zoom suave de la imagen
      tl.from(
        "[data-animate='image'] img",
        {
          scale: 1.2,
          duration: 1.4,
          ease: "power3.out",
        },
        "<",
      );

      // 4. Entrada de la etiqueta flotante
      tl.from(
        "[data-animate='badge']",
        {
          y: 25,
          opacity: 0,
          scale: 0.85,
          duration: 0.7,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      );

      // 5. Movimiento ambiental de la decoración
      gsap.to("[data-animate='glow']", {
        x: 20,
        y: -15,
        scale: 1.15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    {
      scope: containerRef,
      dependencies: [menu],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={containerRef}
      id="dia"
      className="overflow-hidden bg-purple-deep py-20 text-cream md:py-24"
    >
      <div
        className={`${wrap} grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16`}
      >
        {/* Información */}
        <div className="max-w-xl">
          <p data-animate="text" className={kickerLight}>
            Hoy en la olla
          </p>

          <h2
            data-animate="text"
            className="title mt-2 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-tight text-cream"
          >
            Plato del día
          </h2>

          <div
            data-animate="text"
            className="mt-6 h-1 w-16 rounded-full bg-yellow"
          />

          {menu ? (
            <>
              <h3
                data-animate="text"
                className="mt-7 font-display text-2xl font-semibold text-yellow md:text-3xl"
              >
                Menú de hoy
              </h3>

              <p
                data-animate="text"
                className="mt-4 max-w-[48ch] whitespace-pre-line text-lg leading-relaxed text-cream/75 md:text-xl"
              >
                {menu.menu}
              </p>
            </>
          ) : (
            <p
              data-animate="text"
              className="mt-7 text-lg leading-relaxed text-cream/75"
            >
              {error ?? "Todavía no se ha publicado el menú del día."}
            </p>
          )}

          <a
            data-animate="text"
            href="#pedir"
            className={`${btnYellow} mt-7 inline-flex items-center gap-2`}
          >
            Apartar mi almuerzo
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Fotografía */}
        <div className="relative">
          {/* Decoración */}
          <div
            data-animate="glow"
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-yellow/10 blur-3xl"
          />

          <div
            data-animate="image"
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl"
          >
            {menu?.imagen ? (
              <Image
                src={menu.imagen}
                alt="Fotografía del plato del día"
                className="h-full w-full object-cover"
                fill
                unoptimized
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-white/[0.04] text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow/10 text-3xl">
                  🍽
                </div>

                <div>
                  <p className="font-display text-lg font-semibold text-cream">
                    Fotografía del plato
                  </p>

                  <p className="mt-1 text-sm text-cream/45">
                    Imagen disponible próximamente
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Imagen adicional */}
          {menu?.imagenExtra && (
            <div
              data-animate="image"
              className="relative mt-4 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 shadow-xl"
            >
              <Image
                src={menu.imagenExtra}
                alt="Fotografía adicional del menú del día"
                fill
                unoptimized
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}

          {/* Etiqueta flotante */}
          {menu && (
            <div
              data-animate="badge"
              className="absolute -bottom-5 left-5 rounded-2xl border border-white/10 bg-purple-deep/95 px-5 py-3 shadow-xl backdrop-blur-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cream/50">
                Disponible hoy
              </p>

              <p className="font-display text-lg font-semibold text-yellow">
                Hecho en casa
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
