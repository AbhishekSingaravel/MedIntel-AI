import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import Sidebar from "@/components/layout/Sidebar";

function MainLayout() {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const getHeader = () => {
    switch (location.pathname) {
      case "/dashboard":
        return {
          title: "Dashboard",
          subtitle: "Welcome back! Here's an overview of your workspace.",
        };

      case "/documents":
        return {
          title: "Documents",
          subtitle: "Manage your uploaded medical reports.",
        };

      case "/chat":
        return {
          title: "AI Chat",
          subtitle: "Ask MedIntel AI anything about your uploaded reports.",
        };

      default:
        return {
          title: "MedIntel AI",
          subtitle: "",
        };
    }
  };

  const { title, subtitle } = getHeader();

  return (
    <div className="flex min-h-screen gap-8 bg-slate-100">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main className="flex-1 overflow-y-auto px-8 py-8 xl:px-10">

        {/* Header */}
        <div>
          <Header
            title={title}
            subtitle={subtitle}
          />
        </div>

        {/* Page Content */}
        <div className="mt-10">
          <PageContainer>
            <Outlet />
          </PageContainer>
        </div>

      </main>
    </div>
  );
}

export default MainLayout;