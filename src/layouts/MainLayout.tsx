import { Outlet } from "react-router-dom";
import SidebarNavigation from "../components/SidebarNavigation";

export default function MainLayout() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#f3f4f6] overflow-hidden font-sans">
      <SidebarNavigation />
      <main className="flex-1 flex overflow-hidden mb-16 md:mb-0">
        <Outlet />
      </main>
    </div>
  );
}
