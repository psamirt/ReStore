"use client";
import React from "react";
import DashHeader from "../components/dashHeader/b";
import DashSideMenu from "../components/dashSideMenu/d";
import DashPage from "../components/dashPageContent/c";
import DashFooter from "../components/dashFooter/a";
import "./dash.css";
import { Space } from "antd";


function Dashboard() {
  return (
    <div className="app">
      <DashHeader />
      <Space className="SideMenuAndPageContent">
        <DashSideMenu />
        <DashPage render={"home"}/>
      </Space>
      <DashFooter />
    </div>
  );
}

export default Dashboard;
