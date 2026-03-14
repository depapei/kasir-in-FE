import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Nama wajib diisi")
    .min(2, "Nama minimal 2 karakter"),
  username: yup.string().required("Username wajib diisi"),
  // .email("Format email tidak valid"),
  email: yup
    .string()
    .required("Email wajib diisi")
    .email("Format email tidak valid"),
  password: yup
    .string()
    .required("Password wajib diisi")
    .min(6, "Password minimal 6 karakter"),
});
export type RegisterFormData = yup.InferType<typeof registerSchema>;
