const { google } = require('googleapis');
const express = require('express');
const app = express();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'https://emailbot-1uot.onrender.com/callback'
);

// 1. start the login flow
app.get('/login', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly']
  });
  res.redirect(url);
});

// 2. handle the callback and get the token
app.get('/callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  res.send('login successful! now you can /fetch-email');
});

// 3. fetch a recent email
app.get('/fetch-email', async (req, res) => {
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  const response = await gmail.users.messages.list({ userId: 'me', maxResults: 1 });
  const message = await gmail.users.messages.get({ userId: 'me', id: response.data.messages[0].id });
  res.json({ snippet: message.data.snippet });
});

app.listen(3000);
