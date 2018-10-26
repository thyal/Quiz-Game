const app = require("./app");

const server = require('http').Server(app);
const port = 8080;

server.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});