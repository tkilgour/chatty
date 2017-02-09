// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const chatHistory = [{
        type: 'incomingMessage',
        id: "b496cd46-5f51-4867-8056-beacc5f64406",
        username: 'ChattyBot 🤖',
        content: 'Welcome to Chatty! I hope you enjoy your stay.'
      }];

let numOfClients = 0;

const updateUsersOnline = () => {
  const clientUpdate = [{
      type: 'incomingUsersNumber',
      content: numOfClients
    }]

  wss.clients.forEach((client) => {
    client.send(JSON.stringify(clientUpdate));
  })
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  numOfClients++;

  updateUsersOnline();

  ws.send(JSON.stringify(chatHistory));

  ws.on('message', (e) => {
    switch (JSON.parse(e).type) {
      case 'postMessage':
        const newMessage = {
          type: 'incomingMessage',
          id: uuid.v4(),
          username: JSON.parse(e).username,
          content: JSON.parse(e).content
        }

        chatHistory.push(newMessage);

        wss.clients.forEach((client) => {
          client.send(JSON.stringify(chatHistory));
        })
        break;

      case 'postNotification':
        const newNotification = {
          type: 'incomingNotification',
          id: uuid.v4(),
          content: JSON.parse(e).content
        }

        chatHistory.push(newNotification);

        wss.clients.forEach((client) => {
          client.send(JSON.stringify(chatHistory));
        })
        break;
    }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    numOfClients--;

    updateUsersOnline();
  });
});