import app from './app.js';

const PORT = process.env.SERVER_PORT || 2999;
app.listen(PORT, () => {
  console.log(`🟢listening on http://localhost:${PORT}`);
});
