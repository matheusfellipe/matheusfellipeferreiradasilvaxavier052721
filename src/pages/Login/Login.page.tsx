import { Button, Input, PasswordInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import type { LoginType } from "@/app/auth/types";
import { useAuth } from "@/app/auth/useAuth";



const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

 const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const { login, isLoggingIn } = useAuth();

  const onSubmit = async (data: LoginType) => {
    await login(data);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#f7f2ed]">
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-xl shadow-lg backdrop-blur-sm">
        
       

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-1">Welcome Back</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Sign in with your username and password
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            placeholder="Username"
            {...register("username")}
            error={errors.username?.message}
            size="md"
            classNames={{ input: "bg-gray-100 border border-gray-300 focus:border-green-700 focus:bg-white" }}
          />
          <PasswordInput
            placeholder="Password"
            {...register("password")}
            error={errors.password?.message}
            size="md"
            classNames={{ input: "bg-gray-100 border border-gray-300 focus:border-green-700 focus:bg-white" }}
          />

          <Button
            type="submit"
            fullWidth
            disabled={isLoggingIn}
            className="bg-green-700 hover:bg-green-800"
          >
            {isLoggingIn ? "Logging in..." : "Sign In"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-green-700 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};


export default LoginPage;