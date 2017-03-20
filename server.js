const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('port', process.env.PORT || 8080);

require('./api')(app, io);

server.listen(app.get('port'), () => {
  console.log(`npa-chat server now running on port ${app.get('port')}`);
});
