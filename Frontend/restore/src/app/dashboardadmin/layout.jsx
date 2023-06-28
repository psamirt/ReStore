"use client";
import DashHeader from "../components/dashHeader/b";
import DashSideMenu from "../components/dashSideMenu/d";
import DashFooter from "../components/dashFooter/a";
import { Space } from "antd";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <DashHeader />
      <Space className="SideMenuAndPageContent">
        <DashSideMenu />
      {children}
      </Space>
      <DashFooter className="AppFooter" />
    </div>
  );
}
