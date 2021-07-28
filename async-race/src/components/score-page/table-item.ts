import RestApi from '../../rest-api';
import BaseComponent from '../base-component';
import Car from '../garage-page/car';
import CarBlock from '../garage-page/car-block';
import NewWinner from '../garage-page/new-winner';

export default class TableItem extends BaseComponent {
  number = new BaseComponent('td', ['score-number']);

  image = new BaseComponent('td', ['table-img']);

  name = new BaseComponent('td', ['score-name']);

  wins = new BaseComponent('td', ['score-wins']);

  time = new BaseComponent('td', ['score-time']);

  api = new RestApi();

  constructor(id: number, number: number) {
    super('tr', ['table-item']);

    this.addWinner(id, number);
  }

  async addWinner(id: number, number: number): Promise<void> {
    const car = await this.api.getCar(id) as Car;
    const winner = await this.api.getWinner(id) as NewWinner;
    const svg = new CarBlock(car.name, car.color, id.toString()).renderCarImage(car.color, id.toString());

    this.wins.element.id = `score-wins-${id}`;
    this.time.element.id = `score-time-${id}`;

    this.number.element.innerText = `${number + 1}`;
    this.name.element.innerText = car.name;
    this.wins.element.innerText = winner.wins.toString();
    this.time.element.innerText = winner.time.toString();

    this.image.element.insertAdjacentHTML('afterbegin', svg);

    this.element.appendChild(this.number.element);
    this.element.appendChild(this.image.element);
    this.element.appendChild(this.name.element);
    this.element.appendChild(this.wins.element);
    this.element.appendChild(this.time.element);
  }
}
