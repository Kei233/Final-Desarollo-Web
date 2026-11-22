"use client";

import { useState, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Eye, EyeOff, Lock, User, MoveLeft, Check, X } from "lucide-react";
import { btnPrimary } from "../../lib/styles";
import Link from "next/link";
import { uploadForm } from "@/app/actions/uploadForm";
import { useRouter } from "next/navigation";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${btnPrimary} w-fit self-center transition-all duration-200 ${
        pending ? "cursor-not-allowed opacity-60" : ""
      }`}
    >
      {pending ? "Verificando..." : "Iniciar sesión"}
    </button>
  );
}

export default function Admin() {
  const [view, setView] = useState(false);
  const router = useRouter();

  const [state, formAction] = useActionState(uploadForm, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (!state.success) return;

    const timeout = setTimeout(() => {
      router.push("/admin");
    }, 1200);

    return () => clearTimeout(timeout);
  }, [state.success, router]);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-violet-950 px-4 py-10">
      <Link
        href="/"
        className="absolute left-10 top-5 z-50 hidden h-12 w-12 items-center justify-center rounded-full bg-white p-1 md:flex"
      >
        <MoveLeft strokeWidth={3} />
      </Link>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-violet-900 to-violet-800" />

        <div className="absolute -right-1/4 -top-1/4 h-[150%] w-1/3 rotate-[25deg] bg-gradient-to-b from-orange-500 to-orange-600 opacity-90" />

        <div className="absolute -right-[8%] -top-1/4 h-[150%] w-6 rotate-[25deg] bg-orange-300/40" />

        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-fuchsia-500/30 blur-3xl" />

        <div className="absolute left-1/3 top-10 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />

        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <form
        action={formAction}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl shadow-violet-950/50"
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-orange-400 to-violet-700" />

        <Link
          href="/"
          className="absolute left-2 top-3 z-50 flex h-8 w-8 items-center justify-center"
        >
          <MoveLeft strokeWidth={2} />
        </Link>

        <div className="flex flex-col gap-8 px-6 py-10 sm:px-10">
          <header className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Inicia sesión
            </h1>

            <p className="mt-1.5 text-sm text-gray-600">
              Panel de administradores
            </p>
          </header>

          <div className="flex flex-col gap-5">
            {/* USERNAME */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-800"
              >
                Nombre de usuario
              </label>

              <div className="relative">
                <User
                  aria-hidden
                  className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="admin"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 transition focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-800"
              >
                Contraseña
              </label>

              <div className="relative">
                <Lock
                  aria-hidden
                  className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  name="password"
                  type={view ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-11 text-gray-900 placeholder:text-gray-400 transition focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20"
                />

                <button
                  type="button"
                  onClick={() => setView((prev) => !prev)}
                  aria-label={
                    view ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  aria-pressed={view}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-500 transition hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  {view ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <SubmitButton />

          {/* RESPONSE */}
          {state.message && (
            <div
              role="status"
              aria-live="polite"
              className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ${
                state.success
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {state.success ? (
                <Check className="h-5 w-5 shrink-0" />
              ) : (
                <X className="h-5 w-5 shrink-0" />
              )}

              <span>{state.message}</span>
            </div>
          )}
        </div>
      </form>
    </section>
  );
}