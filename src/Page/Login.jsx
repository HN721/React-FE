import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { handleLogin } from "../service/fetchApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await handleLogin(formData.email, formData.password);
      // simpan tokenya ke localstorage
      const token = res.access_token;
      localStorage.setItem("access_token", token);
      console.log(localStorage.setItem("access_token", token));
      console.log("Login successful:", res);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        // Redirect logic would go here
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg flex items-center gap-3">
            <CheckCircle className="text-green-600 flex-shrink-0" size={18} />
            <span className="text-green-800 text-sm">Login successful!</span>
          </div>
        )}

        {/* Form */}
        <div className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.email ? "border-red-300 bg-red-50" : "border-gray-200"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.password
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200"
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
