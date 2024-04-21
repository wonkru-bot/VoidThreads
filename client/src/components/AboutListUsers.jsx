import React from 'react'
import { useSelector } from 'react-redux';

function AboutListUsers() {
    const { currentRoomUsers } = useSelector((state) => state.usersinRoom);
  return (
    <>
    <div className="card-actions px-6 justify-start ">
        <div className="h-48 overflow-x-auto" >
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody className='overflow-auto'>
                
                {
                    currentRoomUsers.map((users,index)=>
                    <tr key={index+1}>
                        <th>{index+1}</th>
                        <td>{users.username}</td>
                        <td>{users.userType?users.userType:"Admin"}</td>
                    </tr>
                )
                }
                
                </tbody>
            </table>
        </div>
        </div> 
    </>
  )
}

export default AboutListUsers
