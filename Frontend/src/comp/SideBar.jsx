import React from "react";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiShoppingBag, HiInbox, HiUser, HiCog, HiLogout, HiUsers, HiHome } from "react-icons/hi";

const SidebarComponent = () => {
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Reservations History
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiUser} label="Administrator">
            <Sidebar.Item href="#" icon={HiUsers}>Employees</Sidebar.Item>
            <Sidebar.Item href="#" icon={HiHome}>Rooms</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item href="#" icon={HiCog}>
            Settings
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiLogout}>
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarComponent;
