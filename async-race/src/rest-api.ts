import Content from './components/content/content';
import Car from './components/garage-page/car';
import { IMove } from './components/interface/IMove';
import { IState } from './components/interface/IState';
import NewWinner from './components/garage-page/new-winner';

export default class RestApi {
  baseUrl = 'https://boiling-fortress-90689.herokuapp.com';

  path = {
    garage: `${this.baseUrl}/garage`,
    engine: `${this.baseUrl}/engine`,
    winners: `${this.baseUrl}/winners`,
  };

  carId = '';

  async getCars(): Promise<Car[]> {
    const response = await fetch(`${this.path.garage}`);
    const data = await response.json();
    return data;
  }

  getCarArray(data: Car[]): void {
    const array: Car[] = [];

    for (let i = 0; i < data.length; i++) {
      const car: Car = { name: data[i].name, color: data[i].color, id: data[i].id };
      array.push(car);
    }

    if (array.length) {
      new Content().checkDB(array);
    }
  }

  async getCar(id: number): Promise<Car> {
    const response = await fetch(`${this.path.garage}/${id}`).catch();
    const car: Car = await response.json();

    return car;
  }

  async createCar(car: Car): Promise<Car> {
    const body = { name: car.name, color: car.color };
    const response = await fetch(`${this.path.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const newCar = await response.json();
    this.carId = await newCar.id;

    return newCar;
  }

  async updateCar(car: Car): Promise<Car> {
    const body = { name: car.name, color: car.color, id: car.id };
    const response = await fetch(`${this.path.garage}/${car.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const newCar = await response.json();
    return newCar;
  }

  async deleteCar(id: number, path: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}${path}/${id}`, {
      method: 'DELETE',
    });

    await response.json();
  }

  async startEngine(id: number): Promise<IMove> {
    const response = await fetch(`${this.path.engine}?id=${id}&status=started`);
    const res = await response.json();

    return res;
  }

  async stopEngine(id: number): Promise<IMove> {
    const response = await fetch(`${this.path.engine}?id=${id}&status=stopped`);
    const res = await response.json();

    return res;
  }

  async drive(id: number): Promise<IState> {
    const response = await fetch(`${this.path.engine}?id=${id}&status=drive`).catch();
    let status = {};

    if (response?.status !== 200) {
      status = { success: false };
    } else {
      status = await response.json();
    }

    return status;
  }

  async getWinners(): Promise<NewWinner[]> {
    const response = await fetch(`${this.path.winners}`);
    const winners = await response.json();

    return winners;
  }

  async getWinner(id: number): Promise<NewWinner> {
    const response = await fetch(`${this.path.winners}/${id}`);
    const winner: NewWinner = await response.json();

    return winner;
  }

  async getWinnerStatus(id: number): Promise<number> {
    const response = await fetch(`${this.path.winners}/${id}`);

    return response.status;
  }

  async createWinner(winner: NewWinner): Promise<NewWinner> {
    const body = { id: winner.id, wins: winner.wins, time: winner.time };

    const response = await fetch(`${this.path.winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const newWinner = await response.json();
    return newWinner;
  }

  async saveWinner(id: number, time: number): Promise<void> {
    const status = await this.getWinnerStatus(id);
    if (status === 404) {
      const newWinner = new NewWinner(id, 1, time);
      await this.createWinner(newWinner);
    } else {
      const winner = await this.getWinner(id);
      let newTime;
      if (time < winner.time) {
        newTime = time;
      } else {
        newTime = winner.time;
      }
      const newWinner = new NewWinner(id, winner.wins + 1, newTime);
      await this.updateWinner(newWinner);
    }
  }

  async updateWinner(winner: NewWinner): Promise<NewWinner> {
    const body = { id: winner.id, wins: winner.wins, time: winner.time };
    const response = await fetch(`${this.path.winners}/${winner.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const newWinner = await response.json();
    return newWinner;
  }
}
