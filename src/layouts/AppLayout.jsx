import { Outlet } from "react-router-dom";
import Sidebar from "@/components/app/Sidebar";
import AppBar from "@/components/app/AppBar";

export default function AppLayout() {
  return (
    <div className="flex size-full h-full">
      <Sidebar />
      <div className="h-full ml-14 flex flex-1 flex-col overflow-hidden bg-background-secondary p-1.5 md:ml-0">
        <AppBar />
        <section className="flex flex-1 flex-col gap-5 overflow-y-auto overflow-x-hidden rounded-xl bg-background-primary p-3 sm:rounded-2xl sm:px-5 h-full">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
