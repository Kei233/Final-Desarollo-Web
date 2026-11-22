"use client";

import { ArrowUpRight } from "lucide-react";

import { btnPrimary } from "@/app/lib/styles";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { useActionState, useEffect, useState } from "react";

import { uploadMenu } from "@/app/actions/menu";

import { ImageUpload } from "@/app/components/ImageUpload";

export function FormAdmin() {
  const [state, formAction, pending] = useActionState(uploadMenu, {
    success: false,
    message: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!state.message) return;

    setShowPopup(true);

    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 4000);

    if (state.success) {
      setShowPopup(false);
      router.push("/#dia");
      return;
    }

    return () => clearTimeout(timer);
  }, [state.message, state.success, router]);

  return (
    <>
      {state.message && showPopup && (
        <div
          role={state.success ? "status" : "alert"}
          className={`
      fixed right-5 top-5 z-50
      flex w-[min(360px,calc(100vw-2.5rem)]
      items-start gap-3
      rounded-xl bg-white p-4
      shadow-xl ring-1 ring-black/10
      border-l-4
      ${state.success ? "border-l-green-500" : "border-l-red-500"}
    `}
        >
          <div className="flex-1">
            <p
              className={`text-sm font-bold ${
                state.success ? "text-green-700" : "text-red-700"
              }`}
            >
              {state.success
                ? "Cambios guardados con exito."
                : "Ha ocurrido un error"}
            </p>

            <p className="mt-1 text-sm text-gray-600">{state.message}</p>
          </div>

          <button
            type="button"
            onClick={() => setShowPopup(false)}
            aria-label="Cerrar notificación"
            className="text-lg leading-none text-gray-400 transition hover:text-gray-800"
          >
            ×
          </button>
        </div>
      )}
      <div className="mx-auto max-w-5xl px-6 py-8 lg:px-10">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="bg-white w-full p-8 rounded-2xl ring ring-orange-600">
            <p className="mb-1 text-sm font-medium text-violet-600">
              Panel de administración
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-violet-950">
              Menú del día
            </h1>

            <p className="mt-2 text-sm text-violet-700/60">
              Actualiza el menú y las fotografías que aparecerán en la página.
            </p>
          </div>
        </header>
        <form action={formAction} className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring ring-orange-600">
            <div className="mb-5 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-xl">
                🍽️
              </div>

              <div>
                <h2 className="font-semibold text-violet-950">
                  Contenido del menú
                </h2>

                <p className="mt-1 text-sm text-violet-700/60">
                  Escribe lo que quieres mostrar como menú del día.
                </p>
              </div>
            </div>

            <textarea
              name="menu"
              id="menu"
              rows={7}
              required
              placeholder="¿Que vamos a servir hoy?"
              className="
            w-full resize-y rounded-xl
            border border-black/30
            bg-violet-100/30
            px-4 py-3
            text-sm leading-6 text-violet-950
            outline-none
            transition
            placeholder:text-violet-300
            focus:border-violet-600
            focus:bg-white
            focus:ring-4
            focus:ring-violet-100
          "
            />
          </div>

          {/* Imágenes */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Imagen menú */}
            <div className="rounded-2xl bg-white p-6 shadow-sm  ring ring-orange-600">
              <div className="mb-5">
                <h2 className="font-semibold text-violet-950">Foto del menú</h2>

                <p className="mt-1 text-sm text-violet-700/60">
                  Imagen principal que acompañará al menú.
                </p>
              </div>

              <ImageUpload
                id="menuImage"
                name="menuImage"
                tone="violet"
                required
              />
            </div>

            {/* Imagen extra */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring ring-orange-600 h-auto">
              <div className="mb-5">
                <h2 className="font-semibold text-violet-950">
                  Platillo extra
                </h2>

                <p className="mt-1 text-sm text-violet-700/60">
                  Fotografía independiente para destacar otro platillo.
                </p>
              </div>

              <ImageUpload id="extraImage" name="extraImage" tone="orange" />
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col-reverse gap-3 border-t border-violet-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white">
              Los cambios se reflejarán en la página pública.
            </p>

            <div className="flex gap-3">
              <Link
                href="/"
                className="
              rounded-xl px-5 py-2.5
              text-sm font-semibold
              text-white
              transition
              ring
              ring-orange-100
              hover:bg-violet-100
              hover:text-violet-800
              text-center
              items-center
              flex
            "
              >
                Cancelar
              </Link>

              <button
                type="submit"
                disabled={pending}
                className={`${btnPrimary} flex items-center gap-2 rounded-xl px-5 py-2.5 disabled:opacity-50`}
              >
                {pending ? "Guardando..." : "Guardar cambios"}

                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
