import Room from '../models/Room.js'

const setNewCode = async (req) => {
    const { room_id, nwcode } = req.body
    try {
        await Room.updateOne(
            {
                _id: room_id
            },
            {
                $set: {
                    "code": nwcode
                }
            }
        )
        console.log(`RoomCode updated to ${nwcode}`)
        setTimeout(async () => {
            await Room.updateOne({ _id: room_id }, { $set: { code: '' } });
            console.log(`Code Deleted after 3 minutes`);
        }, 3 * 60 * 1000);  // change 3 into needed value 
    }
    catch (error) {
        console.log("while updating newcode", error)
    }
}

export default { setNewCode }