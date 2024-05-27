import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCircleUser,
  faHouse,
  faRightFromBracket,
  faScrewdriverWrench,
  faUser
} from "@fortawesome/free-solid-svg-icons";

import { PieChartFilled } from "@ant-design/icons";

const { SubMenu } = Menu;

const items = [
  {
    key: "1",
    icon: <PieChartFilled />,
    label: "Dashboard",
    link: "/dashboard"
  },
  {
    key: "2",
    icon: <FontAwesomeIcon icon={faCalendarAlt} />,
    label: "Reservations",
    link: "/calendar"
  },
  {
    key: "3",
    icon: <FontAwesomeIcon icon={faCircleUser} />,
    label: "Profile",
    link: "/profile"
  },
  {
    key: "sub1",
    label: "Admin Section",
    icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
    children: [
      {
        key: "5",
        icon: <FontAwesomeIcon icon={faUser} />,
        label: "Users",
        link: "/admin/users"
      },
      {
        key: "6",
        icon: <FontAwesomeIcon icon={faHouse} />,
        label: "Rooms",
        link: "/admin/rooms"
      },
      {
        key: "7",
        icon: <FontAwesomeIcon icon={faCalendarAlt} />,
        label: "Events",
        link: "/admin/events"
      }
    ]
  },
  {
    key: "8",
    icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    label: "Logout",
    link: "/logout"
  }
];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Match location pathname with menu item link
    const selectedItem = items.find(item => location.pathname.startsWith(item.link));
    if (selectedItem) {
      setSelectedKey(selectedItem.key);
    }
  }, [location]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <div
      style={{
        width: 256
      }}
    >
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        className="h-[100vh]"
        selectedKeys={[selectedKey]}
        onClick={handleClick}
      >
        {items.map((item) =>
          item.children ? (
            <SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((subItem) => (
                <Menu.Item key={subItem.key} icon={subItem.icon}>
                  <a href={subItem.link}>{subItem.label}</a>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={item.key} icon={item.icon}>
              <a href={item.link}>{item.label}</a>
            </Menu.Item>
          )
        )}
      </Menu>
    </div>
  );
};

export default SideBar;
