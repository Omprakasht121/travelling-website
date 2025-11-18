import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validation/register-schema";
import { registerApiCall, loginApiCall } from "../api/user-api";
import { useAuthModal } from "../../context/AuthModalContext"; // 1. Import context hook

export const useRegister = (onLoginSuccess) => {
  const { login } = useAuthModal(); // 2. Get login function from context
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" }
  });

  const doSubmit = async (formData) => {
    try {
      const regRes = await registerApiCall(formData);
      console.log("Register:", regRes.data);

      if (!regRes.data.id) {
        alert("Register failed");
        return;
      }

      // AUTO LOGIN
      const loginRes = await loginApiCall({
        email: formData.email,
        password: formData.password,
      });

      if (loginRes.data.token) {
        // --- UPDATED ---
        // 3. Call the context login function
        // This assumes loginRes.data contains { token, name, email, profilePic, ... }
        login(loginRes.data);
        
        if (onLoginSuccess) onLoginSuccess(); // 🔥 Redirect + close popup
      } else {
        alert("Auto login failed");
      }

    } catch (err) {
      console.log("Register error", err);
      alert("Register failed");
    }
  };

  return { doSubmit, register, handleSubmit, errors, reset };
};