import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "@/lib/axios";
import { clearUser, setUser } from "@/redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        dispatch(setUser(res.data));
      } catch {
        dispatch(clearUser());
      }
    };
    fetchUser();
  }, [dispatch]);
};
