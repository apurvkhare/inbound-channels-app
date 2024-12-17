import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const leadEvents = [
  { id: '1', type: 'Opened Email', timestamp: '2023-05-10 10:30:00' },
  { id: '2', type: 'Visited Website', timestamp: '2023-05-10 11:15:00' },
  { id: '3', type: 'Opened SMS', timestamp: '2023-05-10 14:45:00' },
];

const leadReplies = [
  { id: '1', content: 'Thanks for reaching out!', timestamp: '2023-05-10 12:00:00' },
  { id: '2', content: "I'm interested in your product.", timestamp: '2023-05-10 15:30:00' },
];

let latestNotification = {
  id: '1',
  content: 'Lead opened your email',
  timestamp: '2023-05-10 16:00:00',
};

app.get('/lead-events', (req, res) => {
  res.json(leadEvents);
});

app.get('/lead-replies', (req, res) => {
  res.json(leadReplies);
});

app.post('/send-reply', (req, res) => {
  const { content } = req.body;
  const newReply = {
    id: (leadReplies.length + 1).toString(),
    content,
    timestamp: new Date().toISOString(),
  };
  leadReplies.push(newReply);
  res.status(201).json(newReply);
});

app.get('/latest-notification', (req, res) => {
  res.json(latestNotification);
});

// Simulate new notifications
setInterval(() => {
  const events = ['opened your email', 'visited your website', 'replied to your message'];
  const randomEvent = events[Math.floor(Math.random() * events.length)];
  latestNotification = {
    id: Date.now().toString(),
    content: `Lead ${randomEvent}`,
    timestamp: new Date().toISOString(),
  };
}, 60000); // Update every minute

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});