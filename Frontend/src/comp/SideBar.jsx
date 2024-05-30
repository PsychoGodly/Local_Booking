import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { useLocation, useHistory } from "react-router-dom";
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

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // Match location pathname with menu item link
    const selectedItem = items.find(item => 
      item.link ? location.pathname.startsWith(item.link) : 
      item.children && item.children.some(child => location.pathname.startsWith(child.link))
    );
    if (selectedItem) {
      setSelectedKey(selectedItem.key);
    } else {
      const selectedChildItem = items.flatMap(item => item.children || []).find(child => location.pathname.startsWith(child.link));
      if (selectedChildItem) {
        setSelectedKey(selectedChildItem.key);
      }
    }
  }, [location]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (e) => {
    const clickedItem = items.find(item => item.key === e.key) || items.flatMap(item => item.children || []).find(child => child.key === e.key);
    if (clickedItem && clickedItem.link) {
      history.push(clickedItem.link);
      window.location.reload(); // Trigger a page refresh
    }
    setSelectedKey(e.key);
  };

  const items = [
    {
      key: "1",
      icon: <PieChartFilled />,
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      key: "2",
      icon: <FontAwesomeIcon icon={faCalendarAlt} />,
      label: "Reservations",
      link: "/calendar",
    },
    {
      key: "3",
      icon: <FontAwesomeIcon icon={faCircleUser} />,
      label: "Profile",
      link: "/profile",
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
          link: "/UsersTable",
        },
        {
          key: "6",
          icon: <FontAwesomeIcon icon={faHouse} />,
          label: "Rooms",
          link: "/RoomsTable",
        },
        {
          key: "7",
          icon: <FontAwesomeIcon icon={faCalendarAlt} />,
          label: "Events",
          link: "/addEvent",
        },
      ],
    },
    {
      key: "8",
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      label: "Logout",
      link: "/logout",
    },
  ];

  return (
    <div style={{ width: 256 }}>
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        className="h-[calc(100vh+150px)]"
        selectedKeys={[selectedKey]}
        onClick={handleClick}
        items={items.map(item => ({
          ...item,
          label: item.children ? item.label : <a href={item.link} onClick={(e) => {e.preventDefault(); history.push(item.link); window.location.reload();}}>{item.label}</a>,
          children: item.children ? item.children.map(child => ({
            ...child,
            label: <a href={child.link} onClick={(e) => {e.preventDefault(); history.push(child.link); window.location.reload();}}>{child.label}</a>
          })) : null
        }))}
      />
    </div>
  );
};

export default SideBar;
