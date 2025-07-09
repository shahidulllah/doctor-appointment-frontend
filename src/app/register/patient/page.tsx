/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function PatientRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    age: "",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register-patient", formData);
      router.push("/login");
    } catch (err: any) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Patient Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "phone", "password", "age", "gender"].map(
          (field) => (
            <input
              key={field}
              name={field}
              type={field === "password" ? "password" : "text"}
              placeholder={field}
              className="w-full px-4 py-2 border rounded"
              onChange={handleChange}
              required
            />
          )
        )}
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </main>
  );
}
