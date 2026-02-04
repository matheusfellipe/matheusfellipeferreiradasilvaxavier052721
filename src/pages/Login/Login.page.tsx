import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 1️⃣ Define the schema
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Logging in with:', data);
    // Replace with your real login logic
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
        <p className="text-gray-600 text-center">
          Sign in with your username and password
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              {...register('username')}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-brand focus:outline-none`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              {...register('password')}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-brand focus:outline-none`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-brand text-white py-3 rounded-lg mt-2"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-gray-500 text-sm">
          Don’t have an account?{' '}
          <a href="/signup" className="text-brand font-medium">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
