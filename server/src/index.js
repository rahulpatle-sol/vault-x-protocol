const express = require('express');
const cors = require('cors');
const statusRoutes = require('./routes/status.routes');
const documentsRoutes = require('./routes/documents.routes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'VaultX Protocol API', version: '1.0.0' });
});

app.use('/api/status', statusRoutes);
app.use('/api/documents', documentsRoutes);

app.listen(PORT, () => {
  console.log(`VaultX API server running on http://localhost:${PORT}`);
});
