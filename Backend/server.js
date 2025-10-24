const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const dotenv = require('dotenv');
dotenv.config();

let bootTime = Date.now(); // Store the server's boot time in memory

// Server status endpoint to send the bootTime
app.get('/api/server-status', (req, res) => {
  res.status(200).json({ bootTime });
});

server.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
