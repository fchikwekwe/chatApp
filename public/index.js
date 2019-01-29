$(document).ready(()=> {
    const socket = io.connect();

    $('#createUserBtn').click((e) => {
        e.preventDefault();
        let username = $('#usernameInput').val();
        if (username.length > 0) {
            // Emit the new user to the server
            socket.emit('new user', username);
            $('.usernameForm').remove();
        }
    });

    // Socket listeners
    socket.on('new user', (username) => {
        console.log(`💫 ${username} has joined the chat`);
    })
});
