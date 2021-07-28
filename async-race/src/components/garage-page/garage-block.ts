import './css/garage-block.css';
import BaseComponent from '../base-component';
import CarBlock from './car-block';

export default class GarageBlock extends BaseComponent {
  carsWrapper = new BaseComponent('div', ['cars-wrapper']);

  message = new BaseComponent('div', ['message']);

  constructor() {
    super('div', ['garage-block']);

    this.element.appendChild(this.carsWrapper.element);
    this.element.appendChild(this.message.element);
  }

  addCars(cars: CarBlock[]): void {
    const garage = document.querySelector('.cars-wrapper');

    cars.forEach((car) => {
      garage?.appendChild(car.element);
    });
  }

  removeCar(car: HTMLElement): void {
    const garage = document.querySelector('.cars-wrapper');
    garage?.removeChild(car);
  }

  updateCar(id: string, newName: string, color: string): void {
    const car = document.getElementById(`svg-${id}`) as HTMLElement;
    const name = document.getElementById(`car-name-${id}`) as HTMLElement;

    car.style.fill = color;
    name.innerText = newName;
  }
}
