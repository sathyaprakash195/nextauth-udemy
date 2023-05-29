"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Link from "next/link";

function VerifyEmail() {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");

  const verifyEmail = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/users/verifyemail`, { token });
      setVerified(true);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  useEffect(() => {
    const tempToken = window.location.search.split("=")[1];
    setToken(tempToken || "");
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Spinner />}

      {verified && (
        <h1 className="success">
          Congratulations , Your email has been verified <br />
          <Link href="/login">Click here to login</Link>
        </h1>
      )}

      {error && <h1 className="error">Something went wrong</h1>}
    </div>
  );
}

export default VerifyEmail;
