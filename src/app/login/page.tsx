/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        formData
      );
      const { role } = res.data;

      if (role === "doctor") {
        router.push("/dashboard/doctor");
      } else if (role === "patient") {
        router.push("/dashboard/patient");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          onChange={handleChange}
          required
        />
        <button className="w-full text-black py-2 rounded">Login</button>
      </form>
    </main>
  );
}
