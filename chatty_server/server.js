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
        user: {name: 'ChattyBot 🤖', color: 'black'},
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

const updateUserColor = (client) => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }

  const userColor = [{
      type: 'incomingUserColor',
      content: color
    }]

  client.send(JSON.stringify(userColor));
}

const extractImg = (string) => {
  const regex = /(http|https):\/\/.+(jpg|png|gif)/;
  const output = regex.exec(string);

  if (output) {
    return {
      url: output[0],
      text: string.replace(output[0], '')
    }
  } else {
    return {
      url: '',
      text: string
    }
  }
}

const chattyBot = (string) => {
  string = string.toLowerCase();

  if (string.search('chattybot') >= 0) {

  }
}


wss.on('connection', (ws) => {

  numOfClients++;

  updateUsersOnline();

  ws.send(JSON.stringify(chatHistory));

  updateUserColor(ws);

  ws.on('message', (e) => {

    // parses message to determine if it's a message or notification
    switch (JSON.parse(e).type) {
      case 'postMessage':
        const newMessage = {
          type: 'incomingMessage',
          id: uuid.v4(),
          user: {name: JSON.parse(e).user.name, color: JSON.parse(e).user.color},
          content: extractImg(JSON.parse(e).content).text,
          img: extractImg(JSON.parse(e).content).url
        }

        chatHistory.push(newMessage);

        const botMessage = {
          type: 'incomingMessage',
          id: uuid.v4(),
          user: {name: 'ChattyBot 🤖', color: 'black'},
          content: '🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖'
        }

        string = JSON.parse(e).content.toLowerCase();
        if (string.search('chattybot') >= 0) {
          chatHistory.push(botMessage);
        }

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
    numOfClients--;

    updateUsersOnline();
  });
});