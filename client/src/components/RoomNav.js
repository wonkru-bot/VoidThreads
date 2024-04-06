
import toast from "react-hot-toast"

function RoomNav() {    
        const handleClick = ()=>{
        toast.success("hi i am clicked")
        }
  return (
    <>

       <div className="flex h-12 justify-between items-center">
   
   <h1>Roshan</h1>
   <button onClick={handleClick} className="border  rounded-lg p-3 border-red-500">Get code </button>
 </div>
    </>
   
  )
}

export default RoomNav
