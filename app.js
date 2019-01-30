/*
* Chat App Main Server
*/

const express = require('express');
const app = express();
const server = require('http').Server(app);

/** Socket.io */
const io = require('socket.io')(server);

let onlineUsers = {};
let channels = {"General": []}

io.on('connection', (socket) => {
    console.log('🔌 New user connected! 🔌');
    require('./sockets/chat.js')(io, socket, onlineUsers, channels);
});

const exphbs = require('express-handlebars');

/** Templating Engine */
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

/** Root Route */
app.get('/', (req, res) => {
    res.render('index.handlebars');
});

/** Port Listener */
server.listen('3000', () => {
    console.log('Server listening on Port 3000');
});
