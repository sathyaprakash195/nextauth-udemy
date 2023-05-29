"use client";
import Input from "@/components/Input";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

function ResetPassword() {
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();

  const sendEmail = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/users/resetpassword`, { email });
      toast.success("Reset password link sent to your email");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/users/resetpassword`, {
        token,
        password,
      });
      toast.success("Password reset successfully , please login");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tempToken = window.location.search.split("=")[1];
    setToken(tempToken || "");
  }, []);

  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [password, confirmPassword]);

  return (
    <div className="flex h-screen justify-center items-center">
      {loading && <Spinner />}

      {token.length === 0 && (
        <div className="auth-form flex flex-col gap-5">
          <h1 className="text-2xl">
            Enter your email to receive reset password link
          </h1>
          <hr />

          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            error={email.length === 0 ? "Email is required" : ""}
            placeholder="Enter your email"
            required
          />

          <button
            className={email.length === 0 ? "disabled-btn" : ""}
            onClick={sendEmail}
          >
            Send reset password link
          </button>
        </div>
      )}

      {token.length > 0 && (
        <div className="auth-form flex flex-col gap-5">
          <h1 className="text-2xl">
            Enter your new password and confirm password
          </h1>
          <hr />

          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            error={password.length === 0 ? "Password is required" : ""}
            placeholder="Enter your password"
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
            error={
              confirmPassword.length === 0 ? "Confirm Password is required" : ""
            }
            placeholder="Enter your confirm password"
            required
          />

          {!passwordsMatch && <p className="error">Passwords do not match</p>}

          <button
            className={
              password.length === 0 ||
              confirmPassword.length === 0 ||
              !passwordsMatch
                ? "disabled-btn"
                : ""
            }
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
