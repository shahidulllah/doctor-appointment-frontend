"use client";
import { useSelector } from "react-redux";
import { useAuth } from "@/hooks/useAuth";
import { RootState } from "@/redux/store";
import { Loader2 } from "lucide-react";

export default function DoctorDashboard() {
  useAuth();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading)
    return (
      <div className="text-center mt-12">
        Loading...
        <Loader2 />
      </div>
    );
    console.log("user", user);
  if (!user || user.role !== "doctor") return <p>Access denied</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome, Dr. {user.name}</h1>
    </div>
  );
}
