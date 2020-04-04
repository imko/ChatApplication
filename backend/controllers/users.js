let users = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if (!name || !room) {
        return { error: 'Username and room required.'};
    }

    // Check if existing user
    const userExists = users.find(user => user.name === name && user.room === room);
    if (userExists) {
        return { error: 'Username is taken' };
    }

    const user = {
        id: id,
        name: name,
        room: room
    };
    users.push(user);

    return { user };
};

const removeUser = id => {
    const userExists = users.some(user => user.id === id);

    if (userExists) {
        users = users.filter(user => user.id !== id);
    }

    return users;
};

const getUser = id => users.find(user => user.id === id);

const getAllUsersInRoom = room => users.filter(user => user.room === room);

module.exports = {
    addUser,
    removeUser,
    getUser,
    getAllUsersInRoom
};