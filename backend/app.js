const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sessionRoutes = require('./routes/session.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/sessions', sessionRoutes);

app.get('/', (req, res) => res.json({ status: 'Eloratio API running' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));