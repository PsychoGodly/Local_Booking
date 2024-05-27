import React from "react";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiShoppingBag, HiInbox, HiUser, HiCog, HiLogout, HiUsers, HiHome } from "react-icons/hi";
import placeholderImage from "../assets/azura.png"; // Make sure to have a placeholder image in the same directory

const SidebarComponent = () => {
  return (
    <div style={{ display: "flex", alignItems: "flex-end" }}>
      {/* Sidebar Menu */}
      <div style={{ flex: "0 0 auto", paddingTop: "20px"}}>
        <Sidebar aria-label="Sidebar with multi-level dropdown example" style={{ textAlign: "left" }}>
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
      </div>

      
    </div>
  );
};

export default SidebarComponent;
