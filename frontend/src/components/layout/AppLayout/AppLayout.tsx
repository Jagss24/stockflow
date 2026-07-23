import { cn } from "@/lib/clsx";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((value) => !value)}
      />

      <div
        className={cn(
          "min-h-screen transition-[padding] duration-200",
          collapsed ? "lg:pl-16" : "lg:pl-60",
        )}
      >
        <Navbar />
        <main id="main-content" className="w-full p-4 sm:p-5 lg:p-6 xl:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
