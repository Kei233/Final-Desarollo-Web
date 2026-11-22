"use server";

export async function uploadForm(
  previousState: {
    success: boolean;
    message: string;
  },
  formData: FormData,
) {

  const name = formData.get("username");

  const password = formData.get("password");

  if (name !== "Admin" || password !== "1234") {
    return {
      success: false,
      message: "Credenciales incorrectas.",
    };
  }

  return {
    success: true,
    message: "Inicio de sesión exitoso.",
  };
  
}
