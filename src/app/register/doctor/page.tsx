/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function DoctorRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    specialization: "",
    hospitalName: "",
    hospitalFloor: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
     const res = await api.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register-doctor`,
        formData
      );
      console.log("res", res);
      router.push("/login");
    } catch (err: any) {
      console.log(err);
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Doctor Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          "name",
          "email",
          "phone",
          "password",
          "specialization",
          "hospitalName",
          "hospitalFloor",
        ].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field}
            className="w-full px-4 py-2 border rounded"
            onChange={handleChange}
            required
          />
        ))}
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </main>
  );
}
