import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthLayout from "@/layouts/AuthLayout";
import TextInput from "@/components/forms/TextInput";
import Button from "@/components/ui/Button";

import { registerSchema } from "@/validations/authSchemas";
import type { RegisterFormData } from "@/validations/authTypes";

import { authService } from "@/services/authService";
import axios from "axios";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
        await authService.register(data);

        alert("Registration successful. Please login.");

        navigate("/");
    } catch (error) {
        console.error(error);

        if (axios.isAxiosError(error)) {
            alert(error.response?.data?.detail ?? "Registration failed");
        } else {
            alert("Registration failed");
        }
    }
    };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Register to access MedIntel AI"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          registration={register("fullName")}
          error={errors.fullName}
        />

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
          placeholder="Create a password"
          registration={register("password")}
          error={errors.password}
        />

        <TextInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword}
        />

        <Button>Register</Button>
      </form>

      <p className="mt-6 text-center">
        Already have an account?{" "}
        <Link to="/" className="text-blue-600 font-semibold">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;