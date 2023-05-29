"use client";
import Input from "@/components/Input";
import Link from "next/link";
import React, { useEffect } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [user, setUser] = React.useState({
    userName: "",
    password: "",
    email: "",
  });

  const onRegister = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/register", user);
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.userName.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex h-screen justify-center items-center">
      {loading && <Spinner />}

      <div className="auth-form flex flex-col gap-5">
        <h1 className="text-2xl">Register</h1>
        <hr />

        <Input
          label="Username"
          type="text"
          name="userName"
          value={user.userName}
          onChange={(e) => setUser({ ...user, userName: e.target.value })}
          error={user.userName.length === 0 ? "Username is required" : ""}
          placeholder="Enter your username"
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          error={user.email.length === 0 ? "Email is required" : ""}
          placeholder="Enter your email"
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          error={user.password.length === 0 ? "Password is required" : ""}
          placeholder="Enter your password"
          required
        />

        <button
          className={buttonDisabled ? "disabled-btn" : ""}
          onClick={onRegister}
        >
          Register
        </button>

        <Link href="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
}

export default Register;
