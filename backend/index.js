const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketio(server);

const router = require('./routes/router');
const { addUser, removeUser, getUser, getAllUsersInRoom } = require('./controllers/users');

const PORT = process.env.PORT || 3001;

io.on('connection', socket => {
    console.log('We have a new connection');

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({
            id: socket.id,
            name: name,
            room: room
        });

        if (error) {
            return callback(error);
        }

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` }); // Welcome the user when logged in
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined.`}); // Broadcast to other users in the room

        socket.join(user.room);
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    });

    socket.on('disconnect', () => {
        console.log('User had left');
    });
});

app.use(router);

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));