import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/login-schema";
import { loginApiCall } from "../api/user-api";
import { useAuthModal } from "../../context/AuthModalContext"; // 1. Import context hook

export const useLogin = (onLoginSuccess) => {
  const { login } = useAuthModal(); // 2. Get login function from context
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const doSubmit = async (formData) => {
    try {
      const res = await loginApiCall(formData);
      console.log("Login response:", res.data);

      if (res.data.token) {
        // --- UPDATED ---
        // 3. Call the context login function.
        // This assumes res.data contains { token, name, email, profilePic, ... }
        login(res.data);

        if (onLoginSuccess) onLoginSuccess();
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.log("Login error", err);
      alert("Login failed");
    }
  };

  return { doSubmit, register, handleSubmit, errors };
};