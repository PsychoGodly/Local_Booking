
import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import config from '../Config';
import Header from './Header';

const Dashboard = () => {

  const [numUsers, setNumUsers] = useState(null);
  const [numSalles, setNumSalles] = useState(null);
  const [numReservations, setNumReservations] = useState(null);
  const [numEvents, setNumEvents] = useState(null);

  useEffect(() => {
        const fetchData = async () => {
            try {
                const responseUser = await fetch(`http://localhost:${config.portBackend}/api/Num_user`);
                const dataUsers = await responseUser.json();
                setNumUsers(dataUsers);
                
                const responseSalle = await fetch(`http://localhost:${config.portBackend}/api/Num_salle`);
                const dataSalle = await responseSalle.json();
                setNumSalles(dataSalle);

                const responseReservation = await fetch(`http://localhost:${config.portBackend}/api/Num_reservation`);
                const dataReservation = await responseReservation.json();
                setNumReservations(dataReservation);

                const responseEvent = await fetch(`http://localhost:${config.portBackend}/api/Num_event`);
                const dataEvent = await responseEvent.json();
                setNumEvents(dataEvent);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

  return (
    <div>
        <Header/>
      <div className="calendar-layout flex justify-between  ">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="main-content w-full">
        <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Users </h1>
          <h2 className="text-xl font-semibold">{numUsers}</h2>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Rooms</h1>
          <h2 className="text-xl font-semibold">{numSalles}</h2>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Reservations</h1>
          <h2 className="text-xl font-semibold">{numReservations}</h2>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Events</h1>
          <h2 className="text-xl font-semibold">{numEvents}</h2>
        </div>
      </div>
    </div>


        </div>
      </div>
    </div>
  )
}



export default Dashboard
