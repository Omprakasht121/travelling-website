import React from "react";
import { useLogin } from "../hooks/login-hook";

export const Login = ({ onLoginSuccess, openRegister }) => {
  const { doSubmit, register, handleSubmit, errors } = useLogin(onLoginSuccess);

  return (
    <form onSubmit={handleSubmit(doSubmit)} className="p-6 w-96 text-white">

      <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>

      <label>Email</label>
      <input {...register("email")} className="w-full text-black p-2 mb-2 rounded" />
      {errors.email && <p className="text-red-400">{errors.email.message}</p>}

      <label>Password</label>
      <input type="password" {...register("password")} className="w-full text-black p-2 mb-2 rounded" />
      {errors.password && <p className="text-red-400">{errors.password.message}</p>}

      <button type="submit" className="w-full bg-blue-500 p-2 rounded mt-3">
        Login
      </button>

      <p className="mt-4 text-center">
        New user?{" "}
        <button type="button" className="underline text-blue-300" onClick={openRegister}>
          Register
        </button>
      </p>
    </form>
  );
};
