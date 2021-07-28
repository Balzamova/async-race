import express from 'express';
import pkg from 'body-parser';
import cors from 'cors';
import garage from './src/routers/garage.router.js';
import winners from './src/routers/winners.router.js';
import engine from './src/routers/engine.router.js';

const { json, urlencoded } = pkg;

const PORT = process.env.PORT || 3000;
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());

app.use('/garage', garage);
app.use('/winners', winners);
app.use('/engine', engine);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});