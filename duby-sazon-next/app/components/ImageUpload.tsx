"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

interface ImageUploadProps {
  id: string;
  name: string;
  tone?: "violet" | "orange";
  required?: boolean;
}

const MAX_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export function ImageUpload({
  id,
  name,
  tone = "violet",
  required = false,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  // Liberar las URLs temporales cuando cambie la imagen
  // o se desmonte el componente.
  useEffect(() => {
    if (!preview) return;

    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validar formato
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Formato no permitido. Usa PNG, JPG o WEBP.");
      setPreview(null);
      setFileName("");
      event.target.value = "";
      return;
    }

    // Validar tamaño
    if (file.size > MAX_SIZE) {
      setError("La imagen supera el límite de 5 MB.");
      setPreview(null);
      setFileName("");
      event.target.value = "";
      return;
    }

    setError("");
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  }

  const labelStyle =
    tone === "orange"
      ? "border-orange-200 hover:border-orange-400 hover:bg-orange-50"
      : "border-violet-200 hover:border-violet-400 hover:bg-violet-50";

  const iconStyle = tone === "orange" ? "bg-orange-100" : "bg-violet-100";

  return (
    <div className="space-y-3 h-full">
      <label
        htmlFor={id}
        className={`
          group flex min-h-56 cursor-pointer
          flex-col items-center justify-center
          rounded-xl border-2 border-dashed
          px-6 py-5 text-center transition
          ${labelStyle}
        `}
      >
        {preview ? (
          <>
            {/* Vista previa */}
            <div className="relative h-36 w-full max-w-xs">
              <Image
                src={preview}
                alt="Vista previa de la imagen seleccionada"
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 320px"
                className="rounded-lg object-contain shadow-sm"
              />
            </div>

            <span className="mt-3 text-sm font-semibold text-violet-900">
              Imagen seleccionada
            </span>

            <span className="mt-1 text-xs text-violet-500">
              Haz clic para cambiarla
            </span>

            <span className="mt-2 max-w-full truncate text-xs text-violet-400">
              {fileName}
            </span>
          </>
        ) : (
          <>
            {/* Estado inicial */}
            <div
              className={`
                mb-3 flex h-14 w-14 items-center
                justify-center rounded-2xl text-2xl
                transition group-hover:scale-105
                ${iconStyle}
              `}
            >
              📷
            </div>

            <span className="text-sm font-semibold text-violet-900">
              Seleccionar imagen
            </span>

            <span className="mt-1 text-xs text-violet-500">
              PNG, JPG o WEBP
            </span>

            <span className="mt-3 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-violet-700 shadow-sm">
              Explorar archivos
            </span>
          </>
        )}

        <input
          type="file"
          id={id}
          name={name}
          accept="image/png,image/jpeg,image/webp"
          required={required}
          onChange={handleFileChange}
          className="sr-only"
        />
      </label>

      {/* Mensaje de error */}
      {error && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}

      {/* Estado de selección */}
      {preview && (
        <p className="text-xs font-medium text-green-600">
          ✓ Imagen lista para guardar
        </p>
      )}
    </div>
  );
}
