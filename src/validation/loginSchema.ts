import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup.string().required("Username wajib diisi"),
  // .email("Format email tidak valid"),
  password: yup
    .string()
    .required("Password wajib diisi")
    .min(3, "Password minimal 3 karakter"),
});
export type LoginFormData = yup.InferType<typeof loginSchema>;
