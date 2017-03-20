module.exports = (app, io) => {
  const isUndefined = require('lodash.isundefined');
  const uuid = require('uuid');

  const messages = require('./data/messages.json');

  const LIMIT = 200;

  app.get('/api/messages', (req, res) => {
    res.status(200).json(messages);
  });

  app.post('/api/messages', (req, res) => {
    const message = req.body.message;
    const nickname = req.body.nickname || 'johndoe';

    if (isUndefined(message)) {
      res.status(400).send('message is missing');
      return;
    }

    if (messages.length === LIMIT) {
      messages.splice(0, 1);
    }
    messages.push({
      id: uuid.v4(),
      content: message,
      timestamp: new Date(),
      sender: {
        nickname,
        avatar: 'img/avatar.png'
      }
    });

    const newMessage = messages[messages.length - 1];
    io.emit('messages/new', newMessage);
    res.status(201).json(newMessage);
  });
};
