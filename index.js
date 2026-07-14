app.get('/test-keys', (req, res) => {
  const idPresent = process.env.CLIENT_ID ? "yes" : "no";
  const secretPresent = process.env.CLIENT_SECRET ? "yes" : "no";
  res.send(`client id found: ${idPresent}, client secret found: ${secretPresent}`);
});
