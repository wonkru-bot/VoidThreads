import React, { useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import AboutListUsers from './AboutListUsers';

function AboutThread({handledescription,currentRoom}) {
    const dateString = currentRoom.createdAt;
    const date = new Date(dateString);
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
      ];
    // Extract day, month, and year
    const day = date.getDate();
    const monthIndex = date.getMonth(); // Months are zero-based, so add 1
    const month = months[monthIndex];
    const year = date.getFullYear();

    // Create the day-month-year format string
    const formattedDate = `${day}-${month}-${year}`;

    const [roomName, setRoomName] = useState('')
    if (currentRoom === undefined) {
        // toast.error('No code for Lobby!');
        currentRoom ==="Lobby"
    }
    return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div  className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex h-full items-end justify-center p-4  sm:items-center sm:p-0" onClick={handledescription}>
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src="https://picsum.photos/900/200" alt="Shoes" /></figure>
            <div className="card-body">
                <div className='mb-4'>
                    <div className='flex justify-end'>
                        <div className=" btn rounded-3xl" onClick={handledescription}>
                            Close!
                        <IoIosCloseCircle className='text-red-500 text-2xl' />
                        </div>
                    </div>
                    <h2 className="card-title">
                    {currentRoom===undefined?"Lobby":currentRoom.name}
                    {/* room name===Lobby>? "badge-primary : badge-secondary"  &&& Old New*/}
                    <div className={`p-3 badge badge-primary`}>Code : {currentRoom.code===undefined?'Free':currentRoom.code}</div>
                    </h2>
                    <p>Created at : {formattedDate}</p>
                    <p>Owner : {currentRoom.authorName===undefined?"Nobody":currentRoom.authorName}</p>
                </div>
                <AboutListUsers/>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default AboutThread
