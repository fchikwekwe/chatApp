$(document).ready(() => {
    const socket = io.connect();

    let currentUser;

    $('#createUserBtn').click((e) => {
        e.preventDefault();
        if($('#usernameInput').val().length > 0) {
            socket.emit('new user', $('#usernameInput').val());
            currentUser = $('#usernameInput').val();
            $('.usernameForm').remove();
            $('.mainContainer').css('display', 'flex');
        }
    });

    $('#sendChatBtn').click((e) => {
        e.preventDefault();

        let message = $('#chatInput').val();
        if (message.length > 0) {
            socket.emit('new message', {
                sender: currentUser,
                message: message,
            });
            $('#chatInput').val("");
        }
    });

    // Socket Listeners
    socket.on('new user', (username) => {
        console.log(`${username} has joined the chat`);
        // Add the new user to the online users div
        $('.usersOnline').append(`<div class="userOnline">${username}</div>`);
    });

    socket.on('new messsage', (data) => {
        $('.messageContainer').append(`
            <div class="message">
                <p class="messageUser">${data.sender}: </p>
                <p class="messageText">${data.message} </p>
                </div>
        `);
    })
});
