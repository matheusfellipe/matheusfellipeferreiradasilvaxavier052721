import { Button, Input, PasswordInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import type { LoginType } from "@/app/auth/types";
import { useAuth } from "@/app/auth/useAuth";



const loginSchema = z.object({
  username: z.string().min(1, "Nome de usuário é obrigatório"),
  password: z.string().min(4, "Senha deve conter no mínimo 4 caracteres"),
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
    <div className="w-full h-screen flex items-center justify-center bg-[#f7f2ed] px-4">
      <div className="relative z-10 w-full max-w-md p-6 md:p-8 bg-white rounded-xl shadow-lg backdrop-blur-sm">
        
       

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-center mb-1">Seja bem-vindo</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Faça login na sua conta
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Input
              placeholder="Nome de usuário"
              {...register("username")}
              error={errors.username?.message}
              size="md"
              w="100%"
            />
          </div>
          <div>
            <PasswordInput
              placeholder="Senha"
              {...register("password")}
              error={errors.password?.message}
              size="md"
              w="100%"
            />
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={isLoggingIn}
            size="md"
            color="green"
          >
            {isLoggingIn ? "Entrando..." : "Entrar"}
          </Button>
        </form>

      
      
      </div>
    </div>
  );
};


export default LoginPage;