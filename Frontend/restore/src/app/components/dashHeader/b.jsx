"use client";
import React from "react";
import { Image, Button, Typography, Space, Badge } from "antd";
import { BellFilled, MailOutlined } from "@ant-design/icons";
import Link from "next/link";


function DashHeader() {
  return (
    <div className="AppHeader">
      {/* <Image
        width={40}
        src="https://www.shutterstock.com/image-vector/user-icon-vector-260nw-393536320.jpg"
      ></Image> */}
      <Link href={"/home"}>
      <Image
        width={40}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Facebook_Home_logo.svg/2048px-Facebook_Home_logo.svg.png"
      ></Image>
      </Link>
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
