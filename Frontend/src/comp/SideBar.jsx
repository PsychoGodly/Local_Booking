import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  LogoutOutlined,
  UserAddOutlined,
  
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { icon } from "@fortawesome/fontawesome-svg-core";
const items = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: "Reservations",
  },
  {
    key: "3",
    icon: <ContainerOutlined />,
    label: "Profile",
  },
  {
    key: "sub1",
    label: "Admin Section",
    icon: <MailOutlined />,
    children: [
      {
        key: "5",
        icon:<UserAddOutlined />,
        label: "Users",
      },
      {
        key: "6",
        label: "Rooms",
      },
      {
        key: "7",
        label: "Events",
      }
    ],
  },
  {
    key: "8",
    icon: <LogoutOutlined />,
    label: "Logout",
  }
  
];
const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        width: 256,
      }}
    >
      
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        className="h-[100vh]"

      />
    </div>
  );
};
export default SideBar;
