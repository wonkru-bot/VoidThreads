import Room from '../models/Room.js'

const getAllRooms = async (req, res) => {
    console.log("enter here")
    const rooms = await Room.find()
    console.log(rooms)
    if (!rooms)
        return res.status(204).json({ 'message': 'No rooms found.' })
    res.json(rooms)
}

const createNewRoom = async (io, socket, roomName, codeexpirytime) => {
    console.log("hi")
    if (!roomName)
        return

    const dublicate = await Room.findOne({ name: roomName }).exec()
    if (dublicate) { // Conflict 
        socket.emit('create-room-response', { status: 'failed', msg: 'Room name already exist' });
        return
    }
    try {
        let randomNumber = Math.floor(Math.random() * 9000) + 1000;
        console.log(randomNumber)
        const room = await Room.create({
            name: roomName,
            author: socket.user.id,
            code: String(randomNumber)
        })
        console.log(codeexpirytime)
        socket.emit('create-room-response', { status: 'success', msg: 'Room created successfully', room })
        io.emit('new-room-created', room);
        console.log(`${socket.user.username} created the ${roomName} chat room`)

        setTimeout(async () => {
            await Room.updateOne({ _id: room._id }, { $set: { code: '' } });
            console.log(`Code cleared for room ${roomName} after ${codeexpirytime} minutes`);
        }, parseInt(codeexpirytime) * 60 * 1000);  // change 10 into 

    } catch (err) {
        console.error(err)
    }
}

const deleteRoom = async (io, socket, roomId) => {
    if (!roomId)
        return

    const room = await Room.findOne({ _id: roomId }).exec()
    if (!room)
        return

    if (room.author.toString() !== socket.user.id)
        return

    await Room.deleteOne({ _id: roomId })
    io.emit('room-deleted', room);
    socket.broadcast.to(room.name).emit('message', { user: 'server', message: `${socket.user.username} has deleted the room ${room.name}` })
    socket.emit('message', { user: 'server', message: `You have deleted the room ${room.name}` })

    const sockets = await io.in(room.name).fetchSockets();
    for (const socket of sockets) {
        socket.leave(room.name)
        socket.user.room = null
    }

    console.log(`${socket.user.username} deleted the ${room.name} chat room`)
}

const emitAllUsersInRoom = async (io, roomName) => {
    const sockets = await io.in(roomName).fetchSockets();
    const users = sockets.map(socket => {
        const { accessToken, id, ...otherUserData } = socket.user
        return otherUserData
    })

    io.to(roomName).emit('users-in-room', users)
}

export default { getAllRooms, createNewRoom, deleteRoom, emitAllUsersInRoom }