import express from 'express';
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const routes = express.Router();
require('./auth').default(routes);

app.use('/api', routes);

export default app;