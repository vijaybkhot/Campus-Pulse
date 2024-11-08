import express from 'express';
import bodyParser from 'body-parser';
const { json } = bodyParser;
import eventsRoutes from './back-end/routes/eventsRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());

// Routes
app.use('/api', eventsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
