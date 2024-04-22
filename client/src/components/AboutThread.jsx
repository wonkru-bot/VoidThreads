import React, { useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import ThemeLists from "../context/ThemeList"
import AboutListUsers from './AboutListUsers';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/rooms/setThemeSlice';
import axios from '../api/axios';
import toast from 'react-hot-toast';

function AboutThread({handledescription,currentRoom}) {
  const { currentRoomUsers } = useSelector((state) => state.usersinRoom);
  const filteredUsers = currentRoomUsers.filter(user => !user.userType);
  console.log(filteredUsers[0])
  console.log(currentRoom._id)

  const Dispatch = useDispatch()
  const [newcode,setnewcode]=useState('')
  const getcreateddate= (value)=>{
        const dateString = value;
        const date = new Date(dateString);
        const months = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
          ];
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const month = months[monthIndex];
        const year = date.getFullYear();
    
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    }

    const handlesetnewcode=async()=>{
      const req={
        room_id:currentRoom._id,
        nwcode:newcode
      }
      try{
        axios.post('/setnewcode',
          req,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        )
        toast.success(`Code will be deleted in 3 Minitue`)
      }
      catch(eror){
        toast.error(eror)
      }
    }


    const handleTheme=(val)=>{
      console.log(val)
      Dispatch(setTheme(val))
    }

    const handlenewcode = (value)=>{
      const val = value.target.value
      setnewcode(val)
  }



    if (currentRoom === undefined) {
        // toast.error('No code for Lobby!');
        currentRoom ==="Lobby"
    }
    return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div  className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex h-full items-end justify-center p-4  sm:items-center sm:p-0" >
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src="https://picsum.photos/900/200" alt="Random images" /></figure>
            <div className="card-body">
                <div className='mb-4'>
                    <div className='flex justify-between'>
                    <div className="dropdown">
                      <div tabIndex={0} role="button" className="btn m-1">Select Theme</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gradient-to-tl from-stone-600 to-slate-400 rounded-box w-36">
                          {
                            ThemeLists.map((theme,index)=>{
                              return(
                                <li key={index}>
                                  <a className='text-white font-mono' onClick={()=>handleTheme(theme.theme)}>{theme.name}</a>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                        <div className=" btn rounded-3xl" onClick={handledescription}>
                            Close!
                        <IoIosCloseCircle className='text-red-500 text-2xl' />
                        </div>
                    </div>
                    <h2 className="card-title">
                    {currentRoom===undefined?"Lobby":currentRoom.name}
                    {/* room name===Lobby>? "badge-primary : badge-secondary"  &&& Old New*/}
                    <div className={`p-3 badge badge-primary`}>Code : {
                    currentRoom === undefined || currentRoom.code === undefined
                    ? 'Free'
                    : currentRoom.code === null
                    ? 'Expired'
                    : currentRoom.code === ''
                    ? 'Expired'
                    : currentRoom.code}
                    </div>
                    </h2>
                    {
                      filteredUsers[0]!==undefined && currentRoom.code === ''?(
                    <div className='flex flex justify-between'>
                      <div className='w-full'>
                        <input
                            placeholder="Enter new Code"
                            defaultValue="" 
                            type="text"
                            onChange={(e)=>handlenewcode(e)}
                             className='input input-bordered text-white w-72 max-w-xs h-10' />
                      </div>
                      <div>
                        <button 
                        type="button"
                        onClick={handlesetnewcode}
                         className='btn font-bold text-white bg-gradient-to-tr from-gray-900 to-stone-500 rounded-lg'>Set New Code</button>
                      </div>
                    </div>
                    ):''
                  }
                    <div>
                      <p>Created at : {currentRoom===undefined?'Somthing went wrong':getcreateddate(currentRoom.createdAt)}</p>
                      <p>Owner : {currentRoom===undefined?"Nobody":currentRoom.authorName}</p>
                    </div>
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
