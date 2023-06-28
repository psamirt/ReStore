import { Menu } from "antd";
import React from "react";
import {
  AppstoreOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  PlusOutlined,
  AppstoreAddOutlined
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

function DashSideMenu() {
 const router=useRouter()

  return (
    <div className="SideMenu">
      <Menu
        onClick={(item) => {
          router.push(item.key)
        }}
        items={[
          {
            label: "Dashboard",
            key: "/dashboardadmin",
            icon: <AppstoreOutlined />,
          },
          {
            label: "Inventario",
            key: "/dashboardadmin/inventario",
            icon: <ShoppingOutlined />,
          },
          {
            label: "Pedidos",
            key: "/dashboardadmin/pedidos",
            icon: <ShoppingCartOutlined />,
          },
          {
            label: "Clientes",
            key: "/dashboardadmin/clientes",
            icon: <UserOutlined />,
          },
          {
            label: "Carrousel",
            key: "/dashboardadmin/carrousel",
            icon: <PlusOutlined />,
          },
          {
            label: "Categorias",
            key: "/dashboardadmin/categorias",
            icon: <AppstoreAddOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}

export default DashSideMenu;
