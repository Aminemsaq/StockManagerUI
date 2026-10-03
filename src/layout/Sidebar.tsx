import { type ReactNode } from "react";

import {
  LayoutDashboard,
  Boxes,
  ArrowLeftRight,
  ShoppingCart,
  FileText,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  to: string;
  isOpen: boolean;
}

const SidebarItem = ({
  icon,
  label,
  to,
  isOpen,
}: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      title={!isOpen ? label : undefined}
      className={({ isActive }) => `
        flex
        h-10
        w-full
        items-center
        rounded-md
        text-sm
        transition-colors
        duration-150

        ${isOpen ? "gap-3 px-4" : "justify-center"}

        ${
          isActive
            ? "bg-white text-slate-900"
            : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
        }
      `}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        {icon}
      </span>

      {isOpen && (
        <span className="whitespace-nowrap">
          {label}
        </span>
      )}
    </NavLink>
  );
};

const SideBar = ({
  isOpen,
  setIsOpen,
}: SidebarProps) => {
  return (
    <aside
      className={`
        fixed
        inset-y-0
        left-0
        z-40
        hidden
        bg-[#191919]
        lg:flex
        lg:flex-col
        transition-[width]
        duration-200
        ease-out

        ${isOpen ? "w-[252px]" : "w-[64px]"}
      `}
    >
      {/* Sidebar Header */}
      <div
        className={`
          flex
          h-[110px]
          shrink-0
          items-center
          border-b
          border-white/[0.06]

          ${isOpen ? "px-8" : "justify-center"}
        `}
      >
        {isOpen ? (
          <div>
            <div className="text-[34px] font-semibold leading-none tracking-[-1px] text-white">
              Orde
              <span className="text-orange-500">
                x
              </span>
            </div>

            <div className="text-[11px] text-slate-400">
              Stock Manager
            </div>
          </div>
        ) : (
          <div className="text-[30px] font-semibold tracking-[-1px] text-white">
            O
            <span className="text-orange-500">
              x
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav
        className={`
          flex-1
          pt-8
          ${isOpen ? "px-4" : "px-3"}
        `}
      >
        <div className="space-y-1">

          {/* Dashboard */}
          <SidebarItem
            isOpen={isOpen}
            to="/dashboard"
            icon={
              <LayoutDashboard
                className="h-[18px] w-[18px]"
                strokeWidth={1.8}
              />
            }
            label="Dashboard"
          />

          {/* Inventory */}
          <SidebarItem
            isOpen={isOpen}
            to="/inventory"
            icon={
              <Boxes
                className="h-[18px] w-[18px]"
                strokeWidth={1.8}
              />
            }
            label="Inventory"
          />

          {/* Stock Movements */}
          <SidebarItem
            isOpen={isOpen}
            to="/stock-movements"
            icon={
              <ArrowLeftRight
                className="h-[18px] w-[18px]"
                strokeWidth={1.8}
              />
            }
            label="Stock Movements"
          />

          {/* Purchase Orders */}
          <SidebarItem
            isOpen={isOpen}
            to="/purchase-orders"
            icon={
              <ShoppingCart
                className="h-[18px] w-[18px]"
                strokeWidth={1.8}
              />
            }
            label="Purchase Orders"
          />

          {/* Reports */}
          <SidebarItem
            isOpen={isOpen}
            to="/reports"
            icon={
              <FileText
                className="h-[18px] w-[18px]"
                strokeWidth={1.8}
              />
            }
            label="Reports & Analytics"
          />

        </div>
      </nav>

      {/* User Profile */}
      <div
        className="
          shrink-0
          border-t
          border-white/[0.06]
          px-3
          py-3
        "
      >
        <button
          type="button"
          title={!isOpen ? "Msaq Amine" : undefined}
          className={`
            flex
            w-full
            items-center
            rounded-lg
            transition-colors
            duration-150

            ${
              isOpen
                ? "gap-3 px-2 py-2 hover:bg-white/[0.06]"
                : "justify-center p-1"
            }
          `}
        >
          {/* User Avatar */}
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white
              text-[11px]
              font-semibold
              tracking-wide
              text-slate-900
            "
          >
            MA
          </div>

          {/* User Name + Role */}
          {isOpen && (
            <div className="min-w-0 flex-1 text-left">
              <div
                className="
                  truncate
                  text-xs
                  font-semibold
                  text-white
                "
              >
                Msaq Amine
              </div>

              <div
                className="
                  mt-0.5
                  truncate
                  text-[10px]
                  text-slate-400
                "
              >
                Administrator
              </div>
            </div>
          )}
        </button>
      </div>

      {/* Collapse Button */}
      <div
        className={`
          shrink-0
          border-t
          border-white/[0.06]
          p-3

          ${isOpen ? "flex justify-end" : "flex justify-center"}
        `}
      >
        <button
          type="button"
          onClick={() =>
            setIsOpen((value) => !value)
          }
          title={
            isOpen
              ? "Close sidebar"
              : "Open sidebar"
          }
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-md
            text-slate-400
            transition-colors
            hover:bg-white/[0.08]
            hover:text-white
          "
        >
          {isOpen ? (
            <ChevronLeft
              className="h-5 w-5"
              strokeWidth={1.8}
            />
          ) : (
            <ChevronRight
              className="h-5 w-5"
              strokeWidth={1.8}
            />
          )}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;