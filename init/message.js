const chat = require('./models/chat')

chat.insertMany([
    {
        sender: 'JohnDoe',
        receiver: 'JaneSmith',
        content: 'Hey, are you free to catch up tomorrow?',
        status: 'read',
        timestamp:'2024-09-01 T10:00:00',
      },
      {
        sender: 'JaneSmith',
        receiver: 'JohnDoe',
        content: 'Sure! Let\'s meet at 5 PM.',
        status: 'read',
        timestamp:'2024-07-08T10:05:00',
      },
      {
        sender: 'JohnDoe',
        receiver: 'Alice',
        content: 'Hey Alice, how did the project go?',
        status: 'delivered',
        timestamp:'2024-09-12T11:15:00',
      },
      {
        sender: 'JaneSmith',
        receiver: 'MarkDarwin',
        content: 'That\'s awesome!',
        status: 'delivered',
        timestamp:'2024-09-01T12:00:00'
      },
      {
        sender: 'Charlie',
        receiver: 'Bob',
        content: 'Congrats on the win, both of you!',
        status: 'sent',
        timestamp: '2024-09-01T13:00:00'
      }
])