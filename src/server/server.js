const app = require("./app");
const socketHandler = require("./sockets/socket_handler");

const server = require('http').Server(app);
socketHandler.start(server);

const port = 8080;

server.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});