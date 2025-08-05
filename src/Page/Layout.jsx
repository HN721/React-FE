import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
