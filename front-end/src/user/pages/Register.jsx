import React from "react";
import { useRegister } from "../hooks/register-hook";

export const Register = ({ openLogin, onLoginSuccess }) => {
  const { doSubmit, register, handleSubmit, errors } = useRegister(onLoginSuccess);

  return (
    <form onSubmit={handleSubmit(doSubmit)} className="p-6 w-96 text-white">

      <h2 className="text-3xl font-semibold mb-6 text-center">Register</h2>

      <label>Name</label>
      <input {...register("name")} className="w-full text-black p-2 mb-2 rounded" />
      {errors.name && <p className="text-red-400">{errors.name.message}</p>}

      <label>Email</label>
      <input {...register("email")} className="w-full text-black p-2 mb-2 rounded" />
      {errors.email && <p className="text-red-400">{errors.email.message}</p>}

      <label>Password</label>
      <input type="password" {...register("password")} className="w-full text-black p-2 mb-2 rounded" />
      {errors.password && <p className="text-red-400">{errors.password.message}</p>}

      <button type="submit" className="w-full bg-green-500 p-2 rounded mt-3">
        Register
      </button>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <button type="button" className="underline text-blue-300" onClick={openLogin}>
          Login
        </button>
      </p>
    </form>
  );
};


