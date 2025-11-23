import express from 'express';

const app = express();
const PORT = 5001;

app.get('/test', (req, res) => {
  console.log('Request received on /test');
  res.json({ message: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log('App initialized');
