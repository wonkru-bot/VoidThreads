import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { useSelector } from 'react-redux';
// check if user failed 3 times then set handlewithcode=true so it close the attempt
// 


function JoinRoomWithCode({handlecodewith}) {
    const { currentRoom } = useSelector((state) => state.currentRoom);
    console.log(currentRoom)
    const handleClose = (event) => {
        // Stop the propagation of the click event
        event.stopPropagation();
        // Call the handlecodewith function
        handlecodewith();
      };
    
  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-10 transition-opacity"></div>

      <div  className="fixed inset-0 z-10 w-screen overflow-y-auto" onClick={handleClose}>
        <div className="flex h-full items-end justify-center p-4  sm:items-center sm:p-0" >
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src="https://picsum.photos/900/200" alt="Random images" /></figure>
            <div className="card-body">
                <div className='mb-4'>
                    <div className='flex justify-end'>
                        <div className=" btn rounded-3xl" onClick={handleClose}>
                            Close!
                        <IoIosCloseCircle className='text-red-500 text-2xl' />
                        </div>
                    </div>
                    <h2 className="card-title">
                        {currentRoom===undefined?'':currentRoom.name}
                    {/* room name===Lobby>? "badge-primary : badge-secondary"  &&& Old New*/}
                    <div className={`p-3 badge badge-primary`}>Enter Code </div>
                    </h2>
                    <p>Created at</p>
                    <p></p>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default JoinRoomWithCode
