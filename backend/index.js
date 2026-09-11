const express = require('express');
const cors = require('cors');
require('dotenv').config();

const financeRoutes = require('./routes/financeRoutes');
const feasibilityRoutes = require('./routes/feasibilityRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/finance', financeRoutes);
app.use('/api/feasibility', feasibilityRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
