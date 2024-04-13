import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function RoomNav() {
  const { currentRoom } = useSelector((state) => state.currentRoom);
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
        currentRoom.code = "No ";
        toast.error("No code for Lobby");
    } else {
        const cde = currentRoom.code;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(cde);
            toast.success(`Code is in clipboard: ${cde}`);
          } else {
            throw new Error('Clipboard API not supported');
          }
        } catch (error) {
          console.error('Failed to write to clipboard:', error);
          toast.error('Failed to copy code to clipboard');
        }
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
