import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "./ui/LoadingScreen";
import { ErrorScreen } from "./ui/ErrorScreen";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, user, error } = useUser("detect");
  const [parent] = useAutoAnimate({ duration: 300 });

  useEffect(() => {
    if (!user && !isLoading) {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;
  if (user)
    return (
      <div className="w-full h-full" ref={parent}>
        {children}
      </div>
    );
}
