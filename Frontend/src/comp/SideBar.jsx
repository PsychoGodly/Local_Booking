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
  PieChartFilled,
  CalendarFilled,
  CalendarOutlined
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarDays, faCircleUser, faHouse, faRightFromBracket, faScrewdriverWrench, faUser } from "@fortawesome/free-solid-svg-icons";
const items = [
  {
    key: "1",
    icon: <PieChartFilled/>,
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
    label: "Reservations",
  },
  {
    key: "3",
    icon: <FontAwesomeIcon icon={faCircleUser} />,
    label: "Profile",
  },
  {
    key: "sub1",
    label: "Admin Section",
    icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
    children: [
      {
        key: "5",
        icon:  <FontAwesomeIcon icon={faUser} />,
        label: "Users",
      },
      {
        key: "6",
        icon:  <FontAwesomeIcon icon={faHouse} />,
        label: "Rooms",
      }
    ],
  },
  {
    key: "8",
    icon:  <FontAwesomeIcon icon={faRightFromBracket} />,
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
