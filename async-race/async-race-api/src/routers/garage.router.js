import { db } from '../config/database.js';
import { StatusCodes } from '../config/statusCodes.js';
import { Router } from 'express';
import { sort } from './sort.helper';

const router = Router();

router.get('/', async (req, res) => {
  const cars = await Promise.resolve(db.garage);
  return res.json(cars);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.sendStatus(StatusCodes.BadRequest);
  }

  const car = db.garage.find((c) => c.id === id);
  await Promise.resolve(car);

  if (!car) {
    return res.sendStatus(StatusCodes.NotFound);
  }

  return res.json(car);
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.sendStatus(StatusCodes.BadRequest);
  }

  try {
    const index = db.garage.findIndex((car) => car.id === id);
    if (index < 0) {
      return Promise.reject(new Error('Car not found'));
    }

    db.garage.splice(index, 1);

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
    let newId;
    
    if (db.garage.length) {
      newId = db.garage[db.garage.length - 1].id + 1;
    } else {
      newId = 1;
    }
    
    const car = { ...data, id: newId }; 
    db.garage.push(car);

    await Promise.resolve(car);
    res.send(car);
  } catch (e) {
    return res.sendStatus(StatusCodes.BadRequest).send(e);
  }
});

router.put('/:id', async (req, res) => {
  const data = req.body;
  const car = db.garage.find((c) => c.id === +data.id);

  if (!car) {
    return res.sendStatus(StatusCodes.BadRequest);
  }

  try {
    for (let i = 0; i < db.garage.length; i++) {
      if (db.garage[i].id === +data.id) {
        db.garage.splice(i, 1);
      }
    }

    const model = {
      ...car,
      name: data.name,
      color: data.color,
    };

    db.garage.push(model);
    sort(db.garage);

    await Promise.resolve(model);
    res.send(model);
  } catch (e) {
    return res.sendStatus(StatusCodes.BadRequest).send(e);
  }
});

export default router;
