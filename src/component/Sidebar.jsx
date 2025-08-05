import React, { useState } from "react";
import {
  Home,
  Users,
  Settings,
  FileText,
  BarChart3,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
} from "lucide-react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [{ icon: Home, label: "Dashboard", active: true }];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-lg rounded-lg p-2 hover:bg-gray-50 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-64"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-semibold text-gray-800">Admin Panel</span>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>
        </div>

        {/* Search Bar */}
        {!isCollapsed && (
          <div className="p-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="mt-2 px-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="mb-1">
                <button
                  className={`
                  w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group relative
                  ${
                    item.active
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
                >
                  <Icon size={20} className="flex-shrink-0" />

                  {!isCollapsed && (
                    <>
                      <span className="ml-3 font-medium">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`
                          ml-auto px-2 py-0.5 rounded-full text-xs font-medium
                          ${
                            item.active
                              ? "bg-white bg-opacity-20 text-white"
                              : "bg-blue-100 text-blue-600"
                          }
                        `}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                      {item.label}
                      {item.badge && (
                        <span className="ml-2 px-1.5 py-0.5 bg-blue-500 rounded-full text-xs">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  John Doe
                </p>
                <p className="text-xs text-gray-500 truncate">
                  john@example.com
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Spacer */}
      <div
        className={`hidden lg:block transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      />
    </>
  );
}
