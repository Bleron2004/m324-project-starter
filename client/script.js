(async () => {
  const myUser = await generateRandomUser();
  let activeUsers = [];
  let typingUsers = [];

  const socket = new WebSocket(generateBackendUrl());
  socket.addEventListener('open', () => {
    console.log('WebSocket connected!');
    socket.send(JSON.stringify({ type: 'newUser', user: myUser }));
  });

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    console.log('WebSocket message:', message);
    switch (message.type) {
      case 'message':
        const messageElement = generateMessage(message, myUser);
        document.getElementById('messages').appendChild(messageElement);
        setTimeout(() => {
          messageElement.classList.add('opacity-100');
        }, 100);
        break;
      case 'activeUsers':
        activeUsers = message.users;
        updateUserList();
        break;
      case 'typing':
        typingUsers = message.users;
        updateTypingIndicator();
        break;
      default:
        break;
    }
  });

  socket.addEventListener('close', () => {
    console.log('WebSocket closed.');
  });

  socket.addEventListener('error', (event) => {
    console.error('WebSocket error:', event);
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sendButton').addEventListener('click', () => {
      const message = document.getElementById('messageInput').value;
      socket.send(JSON.stringify({ type: 'message', message, user: myUser }));
      document.getElementById('messageInput').value = '';
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key.length === 1) {
      socket.send(JSON.stringify({ type: 'typing', user: myUser }));
    }
    if (event.key === 'Enter') {
      const message = document.getElementById('messageInput').value;
      socket.send(JSON.stringify({ type: 'message', message, user: myUser }));
      document.getElementById('messageInput').value = '';
    }
  });

  function updateUserList() {
    const userList = document.getElementById('userListItems');
    if (!userList) return;
    userList.innerHTML = '';
    activeUsers.forEach((user) => {
      const li = document.createElement('li');
      li.textContent = user.name;
      userList.appendChild(li);
    });
  }

  function updateTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    const otherTypingUsers = typingUsers.filter((user) => user.id !== myUser.id);
    if (otherTypingUsers.length === 0) {
      indicator.textContent = '';
    } else if (otherTypingUsers.length === 1) {
      indicator.textContent = `${otherTypingUsers[0].name} schreibt ...`;
    } else {
      indicator.textContent = `${otherTypingUsers.length} Benutzer schreiben ...`;
    }
  }
})();
