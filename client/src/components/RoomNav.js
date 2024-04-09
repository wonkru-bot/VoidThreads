import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function RoomNav() {
  const { currentRoom } = useSelector((state) => state.currentRoom);
  // console.log(currentRoom)
  let curroom = ''
  if(currentRoom===undefined){
    curroom= "Lobby"
  }

  const handleClick = () => {
    if(currentRoom===undefined){
      toast.error('No code for Lobby!')
    }
    else{
      const cde = currentRoom.code
      navigator.clipboard.writeText(cde)
      toast.success(`Code is in clipboard ${cde}`); 
    }
  };

  return (
    <>
      <div className="flex h-12 justify-between items-center">
        <h1 className="font-bold">{currentRoom===undefined? `${curroom}`:`${currentRoom.name}`}</h1>
        <button
          onClick={handleClick}
          className="border  rounded-lg p-3 border-red-500"
        >
          Get code{" "}
        </button>
      </div>
    </>
  );
}

export default RoomNav;
