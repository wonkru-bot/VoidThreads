import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function RoomNav() {
  const { currentRoom } = useSelector((state) => state.currentRoom);

  const handleClick = () => {
    toast.success(currentRoom.code);
  };

  return (
    <>
      <div className="flex h-12 justify-between items-center">
        <h1>Roshan</h1>
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
