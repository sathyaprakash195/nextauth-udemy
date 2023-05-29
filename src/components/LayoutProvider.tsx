"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Spinner from "./Spinner";

function LayoutProvider({ children }: any) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const onLogout = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/logout");
      toast.success("Logout Successfull");
      router.push("/login");
    } catch (error) {
      toast.error("Logout Failed");
    } finally {
      setLoading(false);
    }
  };

  const pathname = usePathname();
  const isNotPrivatePage = pathname === "/login" || pathname === "/register" || pathname === "/verifyemail" || pathname === "/forgotpassword" || pathname === "/resetpassword";
  return (
    <div>
      {loading && <Spinner />}
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css"
        rel="stylesheet"
      ></link>
      <Toaster />
      {!isNotPrivatePage && (
        <div className="flex justify-between items-center gap-3  header">
          <h1>Next Auth</h1>

          <div className="flex items-center gap-3">
            <Link href="/">Home</Link>
            <Link href="/profile">Profile</Link>
            <i className="ri-logout-box-r-line" onClick={onLogout}></i>
          </div>
        </div>
      )}
      <div className="p-3">{children}</div>
    </div>
  );
}

export default LayoutProvider;
