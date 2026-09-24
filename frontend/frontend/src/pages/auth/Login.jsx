import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!form.password) {
      toast.error("Please enter your password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const data = await loginUser(form); // ✅ FIXED
      login(data);
      toast.success("Login successful!");
      navigate("/dashboard"); // better route
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.error || "Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fafafa] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm w-full max-w-[400px] flex flex-col gap-5"
      >
        <div className="text-center mb-2">
          <div className="mx-auto h-12 w-12 bg-gray-900 rounded-full flex items-center justify-center mb-4 shadow-sm">
            <span className="text-white text-xl font-bold font-[Outfit]">JT</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight font-[Outfit]">
            Welcome back
          </h2>
          <p className="text-gray-500 text-sm mt-1.5 font-medium">Please enter your details to sign in.</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
            <Input
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="mt-2">
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-center text-sm text-gray-600 mt-2">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-gray-900 font-semibold cursor-pointer hover:underline underline-offset-4"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;