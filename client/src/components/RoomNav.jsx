import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AboutThread from "./AboutThread";
import { useState } from "react";

function RoomNav() {
  const [opendescription, setopendescription] = useState(false)
  const { currentRoom } = useSelector((state) => state.currentRoom);
  const handledescription = ()=>{
    if (opendescription === true){
      setopendescription(false)
    }
    else{
      setopendescription(true)
    }
  }
  console.log(currentRoom)
  let curroom = ''
  if(currentRoom===undefined){
    curroom= "Lobby"
  }
  else{
    console.log(currentRoom)
  }
  const handleClick = async () => {
    if (currentRoom === undefined) {
        toast.error('No code for Lobby!');
    } else if (currentRoom.code === undefined) {
        toast.error("No code for Lobby");
    } else {
        const cde = currentRoom.code;
        try {
            await navigator.clipboard.writeText(cde);
            toast.success(`Code is in clipboard: ${cde}`);
        } catch (error) {
            console.error('Failed to write to clipboard:', error);
            toast.error(`Failed to copy code to clipboard, Check Description `);
        }
    }
};


  return (
    <>
      <div className="flex h-12 justify-between items-center">
        <div className="flex flex-col p-4 text-gray-900">
          <h1 className="font-bold " onClick={handledescription}>{currentRoom===undefined? `${curroom}`:`${currentRoom.name}`}</h1>
          <h1 className="underline hover:cursor-pointer text-gray-950" onClick={handledescription}>Description</h1>
        </div>
        {
          opendescription?
          <AboutThread 
            handledescription={handledescription}
            currentRoom = {currentRoom}
          />: ''
        }
        {/* <h1 className="font-bold">Owner: {currentRoom===undefined? `${curroom}`:`${currentRoom.authorName}`}</h1> */}
        <button
          onClick={handleClick}
          className="border  rounded-lg p-3 border-red-500 text-gray-900"
        >
          Get code{" "}
        </button>
      </div>
    </>
  );
}

export default RoomNav;
