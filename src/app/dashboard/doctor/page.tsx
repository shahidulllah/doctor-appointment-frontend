"use client";
import { useSelector } from "react-redux";
import { useAuth } from "@/hooks/useAuth";
import { RootState } from "@/redux/store";

export default function DoctorDashboard() {
  useAuth();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <p>Loading...</p>;
  if (!user || user.role !== "doctor") return <p>Access denied</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome, Dr. {user.name}</h1>
    </div>
  );
}
