/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import { IoIosLink } from "react-icons/io";
import { SiLinkerd } from "react-icons/si";
import { RiChatThreadFill } from "react-icons/ri";
import { MdOutlineClose, MdOutlineSegment, MdDeleteOutline } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import AddNewRoomModal from './AddNewRoomModal';
import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';
import axios from '../api/axios';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setRoom } from '../redux/rooms/currentRoomSlice';
import toast, { Toaster } from 'react-hot-toast';
import { setUsersList } from '../redux/rooms/roomUsersSlice';
import JoinRoomWithCode from './JoinRoomWithCode';
import {joinedwithcode, initialRoom, joinedroomError } from '../redux/rooms/joinWithCodeSlice';

function Sidebar() {
  const [sidebarHidden, setSidebarHidden] = useState(true);
  const [isAddRoomModalOpen, setAddRoomModalOpen] = useState(false);
  const [rooms, setRooms] = useState([])
  const [currentRoom, setCurrentRoom] = useState('')
  const { auth } = useAuth()
  const socket = useSocket()
  const logout = useLogout()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [handlewithcode,sethandlewithcode] = useState(false)
  const { roomname, joinedRoom } = useSelector((state) => state.joinRoom);
  
  console.log(auth.user)
  console.log(roomname); // this will log the current room name
  console.log(auth?.id); // this will log the current room name
  console.log("helloo here at 35")
  console.log(joinedRoom); // this will log the current room joined or not


  const handlecodewith = (author=null)=>{
    console.log(author)
    if(handlewithcode){
      sethandlewithcode(false)
      if(!joinedRoom){
        // dispatch(initialRoom())
        setCurrentRoom(roomname)
        console.log("hello at 61 "+ currentRoom)
        joinRoom(currentRoom)
        console.log(currentRoom)
        const joinedRom = rooms.filter ((room) => room.name === currentRoom )
        dispatch ( setRoom (joinedRom[0]) )
      }
      else{
        console.log("hello at 51 "+ currentRoom)
        dispatch(joinedroomError("Lobby"))
        // const joinedRom = rooms.filter ((room) => room.name === "Lobby" )
        // dispatch ( setRoom (joinedRom[0]) )
        // socket.emit('join-room', "Lobby")
      }
    }
    else{
      sethandlewithcode(true)
      // joinRoom(currentRoom)
      const joinedRom = rooms.filter ((room) => room.name === "Lobby" )
      dispatch ( setRoom (joinedRom[0]) )
      dispatch(joinedroomError(joinedRom[0]))
      socket.emit('join-room', "Lobby")
      console.log("hellmyy")
      
    }
  }

  const toggleSidebar = () => {
    setSidebarHidden((prev) => !prev);
  };

  const openAddRoomModal = () => {
    if (isAddRoomModalOpen)
      return
    if (!auth?.accessToken) {
      toast.error("Please log in to create a new room.")
      // alert("Please log in to create a new room.")
      return
    }
    setAddRoomModalOpen(true);
  };

  const closeAddRoomModal = () => {
    setAddRoomModalOpen(false);
  };

  const createRoom = async (roomName) => {
    socket.emit('create-room', roomName)
    try{
      const joinedRom = rooms.filter ((room) => room.name === roomName )
      dispatch ( setRoom (joinedRom[0]) )
      socket.emit('join-room', roomName)
      toast.success("Code will be deleted in One Minitue")
    }
    catch(err){
      toast.error(err)
    }

  }


  const lobbycheck = (roomName)=>{
    if(roomName ==="Lobby"){
      console.log("its lobby bro")
      setCurrentRoom(roomName)
      console.log("wow here")
      socket.emit('join-room', roomName)
      dispatch(joinedroomError())
      const joinedRom = rooms.filter ((room) => room.name === roomName )
      console.log(joinedRom)
      dispatch ( setRoom (joinedRom[0]) )
    }
    else{
      if(joinedRoom){
        sethandlewithcode(false)
        console.log("wow")
        // socket.emit('join-room', roomName)
        setCurrentRoom(roomName)

        dispatch(joinedwithcode(roomName))
        const joinedRom = rooms.filter ((room) => room.name === roomName )
        console.log(joinedRom)
        dispatch ( setRoom (joinedRom[0]) )
      }
    }
  }

  const joinRoom = (roomName,author=null) => {
    console.log(author)
    if(auth?.id === author){
      console.log(auth.user)
      console.log(author)
      socket.emit('join-room', roomName)
      setCurrentRoom(roomName)
      const joinedRom = rooms.filter ((room) => room.name === roomName )
      dispatch ( setRoom (joinedRom[0]) )
    }
    if(roomName!==roomname){
      const joinedRom = rooms.filter ((room) => room.name === roomName )
      console.log(joinedRom)
      dispatch ( setRoom (joinedRom[0]) )
      setCurrentRoom(roomName)
      lobbycheck(roomName)
      console.log("look ghere bro")
      sethandlewithcode(true)
    }
    if (roomName === currentRoom){
      if(joinedRoom){
        sethandlewithcode(true)
        console.log("here at 121")
        lobbycheck(roomName)
      }
      return
    }
    setCurrentRoom(roomName)
    lobbycheck(roomName)

  }



  const deleteRoom = (roomId) => {
    socket.emit('delete-room', roomId)
  }

  useEffect(() => {
    socket.on('create-room-response', (msg) => {
      if (msg.status === 'failed'){
        toast.error(`err at room-response ${msg.msg}`)
        alert("err at room-response", msg.msg)
      }
      else if (msg.status === 'success') {
        joinRoom(msg.room.name)
        setAddRoomModalOpen(false)
      }
    })

  }, [socket])

  useEffect(() => {
    socket.on('new-room-created', (room) => {
      setRooms([...rooms, room])
    })

    socket.on('room-deleted', (room) => {
      setRooms(rooms.filter(r => r._id !== room._id))
    })

    socket.on('users-in-room', (users) => {
      const userslist = users.map((room)=>room)
      // console.log(userslist)
      dispatch(setUsersList(userslist))
    })

  }, [socket,rooms])

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const result = await axios.get('/rooms')
        setRooms(result.data)
        dispatch(initialRoom()) // initializing Lobby!
        result.data.length && joinRoom(result.data[0].name) && setCurrentRoom(result.data[0].name)
        socket.emit('join-room', result.data[0].name)
      } catch (err) { console.error(err) }
    }

    fetchRooms()
  }, [auth])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <>
      <Toaster />
      <span
        className={`${!sidebarHidden ? 'hidden' : 'block'} sm:hidden absolute bg-gray-400 text-black text-4xl top-5 left-4 cursor-pointer rounded-md`}
        onClick={() => toggleSidebar()}
      >
        <MdOutlineSegment className="bi bi-filter-left px-2" />
      </span>
      <div className={`${sidebarHidden ? 'hidden' : 'block'} sm:block absolute w-full h-full z-40 sm:w-64 sm:relative bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-gray-600 to-purple-600 text-gray-800 dark:bg-gray-800 dark:text-white p-4`}>
        <span
          className='block sm:hidden absolute bg-gray-500 text-black text-4xl top-5 right-4 cursor-pointer rounded-md'
          onClick={() => toggleSidebar()}
        >
          <MdOutlineClose className="bi bi-filter-left px-2" />
        </span>
        <div className="flex flex-col justify-between h-full">
          <div className="mt-8">
            <div className="flex items-center sm:justify-between justify-start mb-4">
              <div className='flex items-center'>
                <SiLinkerd className="text-2xl mr-2" />
                <h2 className="text-xl font-semibold">Void Threads</h2>
              </div>
              <IoIosAdd className="sm:text-xl text-4xl sm:px-0 px-1 sm:ml-0 ml-3 font-semibold cursor-pointer bg-slate-300 hover:bg-slate-400 sm:rounded-sm rounded-md" onClick={openAddRoomModal} />
            </div>
            <ul>
            {
                rooms.map((room, index) =>
                  <li key={index} className="m-2">
                    <div className='flex flex-col justify-center'>
                      <div className='flex flex-row justify-between items-center'>
                        <div className="flex items-center cursor-pointer" onClick={() => joinRoom(room.name,room.author)}>
                          {
                            currentRoom==="Lobby"?'':
                            handlewithcode?
                            <JoinRoomWithCode
                            handlecodewith={handlecodewith}
                            rooms={rooms}
                            sethandlewithcode={sethandlewithcode}
                            setCurrentRoom={setCurrentRoom}
                            />:''
                          }
                          <RiChatThreadFill className={`text-xl mr-3 ${room.name === currentRoom && 'text-black text-xl'}`} />
                          <span>{room.name}
                            {/* <span> {room.name === "Lobby" ? '' : ":" }</span> {room?.code} */}
                          </span>
                        </div>
                        {auth?.id === room.author && <MdDeleteOutline onClick={() => deleteRoom(room._id)} size={20} className='text-m hover:text-red-600 cursor-pointer' />}
                      </div>

                    </div>
                  </li>
                )
              }
            </ul>
          </div>
          <div>
            {
              auth?.accessToken &&
              <button onClick={handleLogout} className="w-full my-2 px-6 py-3 text-sm font-medium tracking-wide text-red-600 capitalize transition-colors duration-300 transform bg-white rounded-lg hover:bg-gray-50 focus:outline-none ring-1 ring-inset ring-red-300 focus:ring-opacity-50">
                Logout
              </button>
            }
          </div>
        </div>
      </div>
      {isAddRoomModalOpen && <AddNewRoomModal onClose={closeAddRoomModal} createRoom={createRoom} />}
    </>
  );
}

export default Sidebar
