import { db } from '../config/database.js';
import { StatusCodes } from '../config/statusCodes.js';
import { Router } from 'express';
import { sort } from './sort.helper';

const router = Router();

router.get('/', async (req, res) => {
  const cars = await Promise.resolve(db.winners);
  return res.json(cars);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.sendStatus(StatusCodes.BadRequest);
  }

  const car = db.winners.find((c) => c.id === id);
  await Promise.resolve(car);

  if (!car) {
    return res.sendStatus(StatusCodes.NotFound);
  }

  res.status(StatusCodes.Ok).send(car);
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.sendStatus(StatusCodes.BadRequest);
  }

  try {
    const index = db.winners.findIndex((car) => car.id === id);
    if (index < 0) {
      return Promise.reject(new Error('Car not found'));
    }

    db.winners.splice(index, 1);

    await Promise.resolve();
    return res.sendStatus(StatusCodes.Ok);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

router.post('/', async (req, res) => {
  const data = req.body;

  if (!data) {
    return res.sendStatus(StatusCodes.BadRequest);
  }

  try {
    const car = { ...data, wins: 1, time: data.time };
    db.winners.push(car);
    sort(db.winners);

    await Promise.resolve(car);
    res.send(car);
  } catch (e) {
    return res.sendStatus(StatusCodes.BadRequest).send(e);
  }
});

router.put('/:id', async (req, res) => {
  const data = req.body;
  const car = db.winners.find((c) => c.id === +data.id);

  if (!car) {
    return res.sendStatus(StatusCodes.BadRequest);
  }

  try {
    (+data.time < car.time) ? car.time = data.time : car.time = car.time;
    car.wins++;

    await Promise.resolve(car);
    res.send(car);
  } catch (e) {
    return res.sendStatus(StatusCodes.BadRequest).send(e);
  }
});

export default router;
