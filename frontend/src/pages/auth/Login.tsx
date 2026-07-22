import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthLayout from "@/layouts/AuthLayout";
import TextInput from "@/components/forms/TextInput";
import Button from "@/components/ui/Button";

import { loginSchema } from "@/validations/authSchemas";
import type { LoginFormData } from "@/validations/authTypes";

import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";

import { useAuth } from "@/store/AuthContext";


function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const onSubmit = async (data: LoginFormData) => {
    try {
        const response = await authService.login(data);

        login(response.access_token);

        

        navigate("/dashboard");
    } catch (error) {
        console.error(error);
        alert("Invalid email or password");
    }
    };

  return (
    <AuthLayout
      title="MedIntel AI"
      subtitle="Sign in to continue"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          registration={register("email")}
          error={errors.email}
        />

        <TextInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          registration={register("password")}
          error={errors.password}
        />

        <Button>Login</Button>
      </form>

      <p className="mt-6 text-center">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-semibold"
        >
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;