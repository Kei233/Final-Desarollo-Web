"use server";

import { pool } from "@/app/lib/db";
import { revalidatePath } from "next/cache";

type MenuState = {
  success: boolean;
  message: string;
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

function validateImage(file: File): boolean {
  return (
    file.size > 0 &&
    file.size <= MAX_IMAGE_SIZE &&
    ALLOWED_TYPES.includes(file.type)
  );
}

export async function uploadMenu(
  previousState: MenuState,
  formData: FormData
): Promise<MenuState> {
  const menu = formData.get("menu");
  const menuImage = formData.get("menuImage");
  const extraImageValue = formData.get("extraImage");

  // Validar texto
  if (typeof menu !== "string" || !menu.trim()) {
    return {
      success: false,
      message: "Debes escribir el menú del día.",
    };
  }

  // La imagen principal es obligatoria
  if (!(menuImage instanceof File) || !validateImage(menuImage)) {
    return {
      success: false,
      message: "Debes seleccionar una imagen válida (PNG, JPG o WEBP, máximo 5 MB).",
    };
  }

  // La imagen adicional es opcional
  let extraImage: File | null = null;

  if (extraImageValue instanceof File && extraImageValue.size > 0) {
    if (!validateImage(extraImageValue)) {
      return {
        success: false,
        message: "La imagen adicional no es válida o supera los 5 MB.",
      };
    }

    extraImage = extraImageValue;
  }

  try {
    // Convertir archivos a Buffer para PostgreSQL
    const menuImageBuffer = Buffer.from(
      await menuImage.arrayBuffer()
    );

    const extraImageBuffer = extraImage
      ? Buffer.from(await extraImage.arrayBuffer())
      : null;

    // Crear o actualizar el único registro del menú
    await pool.query(
      `
        INSERT INTO menu_del_dia (
          id,
          menu,
          menu_image,
          menu_image_type,
          extra_image,
          extra_image_type
        )
        VALUES (1, $1, $2, $3, $4, $5)

        ON CONFLICT (id)
        DO UPDATE SET
          menu = EXCLUDED.menu,
          menu_image = EXCLUDED.menu_image,
          menu_image_type = EXCLUDED.menu_image_type,
          extra_image = EXCLUDED.extra_image,
          extra_image_type = EXCLUDED.extra_image_type,
          updated_at = CURRENT_TIMESTAMP;
      `,
      [
        menu.trim(),
        menuImageBuffer,
        menuImage.type,
        extraImageBuffer,
        extraImage?.type ?? null,
      ]
    );

    // Actualizar la página pública
    revalidatePath("/");

    return {
      success: true,
      message: "Menú actualizado correctamente.",
    };
  } catch (error) {
    console.error("Error al guardar el menú:", error);

    return {
      success: false,
      message: "No se pudo guardar el menú. Inténtalo nuevamente.",
    };
  }
}