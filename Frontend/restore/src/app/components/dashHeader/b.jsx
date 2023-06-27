"use client";
import React from "react";
import { Image, Button, Typography, Space, Badge } from "antd";
import { BellFilled, MailOutlined } from "@ant-design/icons";
function DashHeader() {
  return (
    <div className="AppHeader">
      <Image
        width={40}
        src="https://www.shutterstock.com/image-vector/user-icon-vector-260nw-393536320.jpg"
      ></Image>
      <Typography.Title>ReStore DashBoard</Typography.Title>
      <Space >
        <Badge count={10} dot>
          <MailOutlined style={{ fontSize: 24 }} />
        </Badge>
        <Badge count={20}>
          <BellFilled style={{ fontSize: 24 }} />
        </Badge>
      </Space>
    </div>
  );
}

export default DashHeader;
