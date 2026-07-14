const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('bot is running!');
});

// THIS IS THE PART YOU NEED TO ADD:
app.get('/test-keys', (req, res) => {
  const idPresent = process.env.CLIENT_ID ? "yes" : "no";
  const secretPresent = process.env.CLIENT_SECRET ? "yes" : "no";
  res.send(`client id found: ${idPresent}, client secret found: ${secretPresent}`);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
