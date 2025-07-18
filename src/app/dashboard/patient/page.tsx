"use client";

import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Loader2 } from "lucide-react";

export default function PatientDashboard() {
  useAuth();

  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading)
    return (
      <div className="text-center mt-12">
        Loading...
        <Loader2 />
      </div>
    );
  if (!user || user.role !== "patient") return <p>Access denied</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p className="text-gray-700 mt-2">This is your patient dashboard.</p>
    </div>
  );
}
