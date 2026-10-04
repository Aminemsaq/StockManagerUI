import { useState, type ReactNode } from "react";

import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({
  children,
}: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(true);

  return (
    <div
      className="
        min-h-screen
        w-full
        bg-[#191919]
      "
    >
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div
        className={`
          min-h-screen
          w-auto
          transition-[margin]
          duration-200
          ease-out
          ${
            isSidebarOpen
              ? "lg:ml-[252px]"
              : "lg:ml-[64px]"
          }
        `}
      >
        <main
          className="
            min-h-screen
            w-full
            bg-[#f3f4f6]
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;