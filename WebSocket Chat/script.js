// WebSocket connection setup
const socket = new WebSocket("ws://localhost:8080");

// DOM elements
const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Connection opened
socket.addEventListener("open", (event) => {
  addMessageToContainer("Connected to the server");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  addMessageToContainer(event.data);
});

// Connection closed
socket.addEventListener("close", (event) => {
  addMessageToContainer("Disconnected from the server");
});

// Error handling
socket.addEventListener("error", (event) => {
  addMessageToContainer("WebSocket error: " + event);
});

// Send message when button is clicked
sendButton.addEventListener("click", () => {
  sendMessage();
});

// Send message when Enter key is pressed
messageInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = messageInput.value;
  if (message.trim() !== "") {
    socket.send(message);
    addMessageToContainer("You: " + message);
    messageInput.value = "";
  }
}

function addMessageToContainer(message) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageContainer.appendChild(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

// ... (previous code remains the same until the message event listener)

// Listen for messages with type handling
socket.addEventListener('message', (event) => {
    try {
        // Try to parse as JSON
        const data = JSON.parse(event.data);
        
        if (data.type === 'text') {
            addMessageToContainer(`${data.sender}: ${data.content}`);
        } 
        else if (data.type === 'notification') {
            addMessageToContainer(`System: ${data.content}`, 'notification');
        }
        else if (data.type === 'user-count') {
            addMessageToContainer(`Users online: ${data.count}`, 'notification');
        }
    } catch (e) {
        // If not JSON, treat as plain text
        addMessageToContainer(event.data);
    }
});

// ... (rest of the previous code remains the same)

// Update sendMessage function to send JSON
function sendMessage() {
    const message = messageInput.value;
    if (message.trim() !== '') {
        const messageObj = {
            type: 'text',
            content: message,
            timestamp: new Date().toISOString()
        };
        socket.send(JSON.stringify(messageObj));
        addMessageToContainer('You: ' + message);
        messageInput.value = '';
    }
}

// Update addMessageToContainer to handle different types
function addMessageToContainer(message, type = 'text') {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    
    if (type === 'notification') {
        messageElement.style.color = '#666';
        messageElement.style.fontStyle = 'italic';
    }
    
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}