"use server";

import { pool } from "@/app/lib/db";

type MenuRow = {
  menu: string;
  menu_image: Buffer | null;
  menu_image_type: string | null;
  extra_image: Buffer | null;
  extra_image_type: string | null;
};

export type MenuDelDia = {
  menu: string;
  imagen: string | null;
  imagenExtra: string | null;
};

type MenuResult =
  | {
      success: true;
      data: MenuDelDia | null;
    }
  | {
      success: false;
      message: string;
    };

// Convierte una imagen de PostgreSQL a una URL que pueda utilizar Next/Image.
function imageToDataUrl(
  image: Buffer | null,
  imageType: string | null
): string | null {
  if (!image || !imageType) return null;

  return `data:${imageType};base64,${image.toString("base64")}`;
}

export async function getMenuDelDia(): Promise<MenuResult> {
  try {
    const { rows } = await pool.query<MenuRow>(
      `
        SELECT
          menu,
          menu_image,
          menu_image_type,
          extra_image,
          extra_image_type
        FROM menu_del_dia
        WHERE id = $1
        LIMIT 1;
      `,
      [1]
    );

    const menu = rows[0];

    // No existe ningún menú registrado.
    if (!menu) {
      return {
        success: true,
        data: null,
      };
    }

    return {
      success: true,
      data: {
        menu: menu.menu,
        imagen: imageToDataUrl(
          menu.menu_image,
          menu.menu_image_type
        ),
        imagenExtra: imageToDataUrl(
          menu.extra_image,
          menu.extra_image_type
        ),
      },
    };
  } catch (error) {
    console.error("Error al consultar el menú:", error);

    return {
      success: false,
      message: "No se pudo cargar el menú del día.",
    };
  }
}