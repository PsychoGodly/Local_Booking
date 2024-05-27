
import React from 'react'
import SideBar from './SideBar'
import { BsFillArchiveFill, BsFillBellFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Dashboard = () => {

    

  return (
    <div>
      <div className="calendar-layout flex justify-between  ">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="main-content w-full">
        <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Card 1</h1>
          <h2 className="text-xl font-semibold">Sub Title 1</h2>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Card 2</h1>
          <h2 className="text-xl font-semibold">Sub Title 2</h2>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Card 3</h1>
          <h2 className="text-xl font-semibold">Sub Title 3</h2>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Card 4</h1>
          <h2 className="text-xl font-semibold">Sub Title 4</h2>
        </div>
      </div>
    </div>


        </div>
      </div>
    </div>
  )
}



export default Dashboard
