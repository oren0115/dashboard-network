"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user || pathname === "/login") {
    return null;
  }

  const isAdmin = user.role === "admin";

  const navigationItems = [
    { name: "Dashboard", href: "/", allowedRoles: ["admin", "user"] },
    { name: "Devices", href: "/devices", allowedRoles: ["admin", "user"] },
    { name: "Alerts", href: "/alerts", allowedRoles: ["admin", "user"] },
    { name: "Logs", href: "/logs", allowedRoles: ["admin"] }, // Only admin can access logs
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800">
                Network Monitor
              </h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationItems.map((item) => {
                if (!item.allowedRoles.includes(user.role)) {
                  return null;
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      pathname === item.href
                        ? "border-b-2 border-blue-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } inline-flex items-center px-1 pt-1 text-sm font-medium`}>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-4">
              {user.username} ({user.role})
            </span>
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-gray-700">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
