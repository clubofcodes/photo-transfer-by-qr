import { enqueueSnackbar } from "notistack";
import React, { FormEvent } from "react";
import { useNavigate } from "react-router";
import { GLOBAL_ENV } from "../services/env";

interface LoginForm {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleChange = <T extends keyof LoginForm>(field: T, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${GLOBAL_ENV.BACKEND_BASE_URL_API}auth/signin/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const result = await res.json();

      if (res?.status === 201) {
        enqueueSnackbar(result?.message, { variant: "success" });
        localStorage.setItem("authUser", JSON.stringify(result?.data));
        navigate("/qr-code");
      } else {
        enqueueSnackbar(result?.message, { variant: "error" });
      }
    } catch (error: any) {
      console.log({ error });
      enqueueSnackbar(error?.["message"] ?? "An unexpected error occurred", {
        variant: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
      </h2>
      <div>
        <label htmlFor="email" className="input-label">
          Email
        </label>
        <div className="relative">
          <div className="input-inline-icon-wrapper">
            <svg
              className="input-inline-svg-icon"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="input-field"
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="input-label">
          Password
        </label>
        <div className="relative">
          <div className="input-inline-icon-wrapper">
            <svg
              className="input-inline-svg-icon"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a4 4 0 0 0-4 4v2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4Zm0 2a2 2 0 0 1 2 2v2H8V6a2 2 0 0 1 2-2Zm-1 8a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2Z" />
            </svg>
          </div>

          <input
            type="password"
            name="password"
            id="password"
            className="input-field"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-theme hover:bg-theme/40 focus:ring-4 focus:outline-none focus:ring-theme/90 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-theme dark:hover:bg-theme/40 dark:focus:ring-theme/20"
      >
        Sign In
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?
        <a
          href={"#"}
          className="ml-1 text-xs font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Sign Up
        </a>
      </p>
    </form>
  );
};

export default LoginScreen;
