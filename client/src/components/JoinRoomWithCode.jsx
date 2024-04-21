import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { IoIosCloseCircle } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import {joinedwithcode, initialRoom, joinedroomError } from '../redux/rooms/joinWithCodeSlice';
import { setRoom } from '../redux/rooms/currentRoomSlice';
import useSocket from '../hooks/useSocket';

// check if user failed 3 times then set handlewithcode=true so it close the attempt
// 




function JoinRoomWithCode({handlecodewith,rooms,sethandlewithcode}) {
    const socket = useSocket()
    const { currentRoom } = useSelector((state) => state.currentRoom);
    const distpatch = useDispatch()
    const [code, setcode] = useState("")
    // console.log(currentRoom)
    const handleClose = (event) => {
        // Stop the propagation of the click event
        event.stopPropagation();
        // Call the handlecodewith function
        handlecodewith();
        sethandlewithcode(false)
      };

    const stopPropagation = (event) => {
        // Stop the propagation of the click event
        event.stopPropagation();
    };

    const handlecode = (value)=>{
        const val = value.target.value
        setcode(val)
    }
    // console.log(code)
    
    const checkcode =()=>{
        if(currentRoom===undefined){
            toast.error("no code for this room!")
            sethandlewithcode(false)
        }
        else if(code===String(currentRoom.code)){
            toast.success(`Welcome to ${currentRoom.name}`)
            distpatch(joinedwithcode(currentRoom.name))
            sethandlewithcode(false)
            socket.emit('join-room', currentRoom.name)
            handlecodewith()
        }
        else{
            toast.error("Not a valid code!")
            distpatch(joinedroomError())
            // sethandlewithcode(false)
            // const joinedRom = rooms.filter ((room) => room.name === "Lobby" )
            // distpatch ( setRoom (joinedRom[0]) )
            // socket.emit('join-room', "Lobby")
        }
    }

  return (
    <>
    <Toaster />
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-10 transition-opacity"></div>

      <div  className="fixed inset-0 z-10 w-screen overflow-y-auto" onClick={stopPropagation}>
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
                    <h2 className="p-2 card-title">
                        {currentRoom===undefined?'':currentRoom.name}                    
                    </h2>
                    {/* room name===Lobby>? "badge-primary : badge-secondary"  &&& Old New*/}
                    <div className='flex flex-col'>
                        {/* <div className={`p-2 text-lg text-primary`}>Enter Code </div> */}
                        <input type="text" 
                        placeholder="Enter the code & join Thread!"
                        defaultValue=""
                            onChange={(e)=>handlecode(e)}
                            onClick={stopPropagation}
                            className="input input-bordered w-full max-w-xs" />
                            <div className='mt-2 flex justify-center'>
                                <button
                                    onClick={checkcode}
                                    className='py-2 px-8 border rounded-lg bg-slate-950 hover:bg-slate-800'>
                                        Join
                                </button>
                            </div>
                    <p className='p-2 font-mono text-slate-500 text-sm'>Owner : {currentRoom===undefined?"Nobody":currentRoom.authorName}</p>
                    </div>

                    <p></p>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default JoinRoomWithCode
