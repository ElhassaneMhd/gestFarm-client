import { Loader } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-90 z-50 flex justify-center items-center   ">
      <Loader size={60} className=" animate-spin" />
    </div>
  );
}
