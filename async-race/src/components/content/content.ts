import './css/content.css';
import RestApi from '../../rest-api';
import BaseComponent from '../base-component';
import CarBlock from '../garage-page/car-block';
import GaragePage from '../garage-page/garage-page';
import ScorePage from '../score-page/score-page';
import Navigation from './navigation';
import Car from '../garage-page/car';

export default class Content extends BaseComponent {
  private navigation = new Navigation();

  private garagePage = new GaragePage();

  private scorePage = new ScorePage();

  api = new RestApi();

  currentCarId = 0;

  currentName = '';

  currentColor = '';

  constructor() {
    super('div', ['content']);

    this.element.appendChild(this.navigation.element);
    this.element.appendChild(this.garagePage.element);
    this.element.appendChild(this.scorePage.element);

    this.listen();
  }

  async checkDB(data: Array<Car>): Promise<void> {
    const array: CarBlock[] = [];

    for (let i = 0; i < data.length; i++) {
      array.push(new CarBlock(data[i].name, data[i].color, data[i].id));
    }

    this.garagePage.garage.block.addCars(array);
    this.garagePage.garage.page.garageCarsCount();
    this.garagePage.pagination.checkBtnsDisabled('garage');
    this.garagePage.controls.raceBtnDisabled(false);

    await this.scorePage.getWinners();
    this.scorePage.page.scoreCarsCount();
  }

  listen(): void {
    this.element.addEventListener('click', async (event) => {
      if (event.target instanceof EventTarget) {
        const elem = event.target as HTMLElement;

        if (elem.classList.contains('btn-to-garage')) {
          this.navigation.toGarage();
          this.garagePage.element.classList.remove('none');
          this.scorePage.element.classList.add('none');
        }

        if (elem.classList.contains('btn-to-winners')) {
          this.navigation.toWinners();
          this.garagePage.element.classList.add('none');
          this.scorePage.element.classList.remove('none');
        }

        if (elem.classList.contains('btn-submit')) {
          this.createNewCar();
        }

        if (elem.classList.contains('btn-generate')) {
          this.generateCars();
        }

        if (elem.classList.contains('btn-remove')) {
          this.removeCar(event);
        }

        if (elem.classList.contains('btn-select')) {
          this.checkCarToSelect(event);
        }

        if (elem.classList.contains('btn-update')) {
          if (!this.currentCarId) { return; }
          this.updateCar(this.currentCarId);
          this.garagePage.switchInputsDisabled(false);
          this.disactiveBtns('.btn-select', 'active');
        }

        if (elem.classList.contains('btn-next')
        && elem.classList.contains('garage-btn')) {
          this.garagePage.pagination.slide('garage', 'next');
          const count = this.garagePage.pagination.currentPage;
          this.garagePage.garage.page.garagePage(count);
        }

        if (elem.classList.contains('btn-prev')
        && elem.classList.contains('garage-btn')) {
          this.garagePage.pagination.slide('garage', 'prev');
          const count = this.garagePage.pagination.currentPage;
          this.garagePage.garage.page.garagePage(count);
        }

        if (elem.classList.contains('btn-next')
        && elem.classList.contains('score')) {
          this.scorePage.pagination.slide('score', 'next');
          const count = this.scorePage.pagination.currentPage;
          this.scorePage.page.garagePage(count);
        }

        if (elem.classList.contains('btn-prev')
        && elem.classList.contains('score')) {
          this.scorePage.pagination.slide('score', 'prev');
          const count = this.scorePage.pagination.currentPage;
          this.scorePage.page.garagePage(count);
        }

        if (elem.classList.contains('btn-start')
        || elem.classList.contains('btn-stop')) {
          this.checkCarToMove(event);
        }
      }
    });
  }

  disactiveBtns(btnClass: string, activeClass: string): void {
    const btns = document.querySelectorAll(btnClass);

    btns.forEach((el) => {
      el.classList.remove(activeClass);
    });
  }

  async createNewCar(): Promise<void> {
    let carName = this.garagePage.formCreate.getCarName();
    let carColor = this.garagePage.formCreate.getCarColor();

    if (!carName) { carName = this.garagePage.formCreate.getRandomName(); }

    if (carColor === '#000000') { carColor = this.garagePage.formCreate.getRandomColor(); }

    const newCar = await this.api.createCar(new Car(carName, carColor, '0'));
    const car: CarBlock[] = [new CarBlock(carName, carColor, newCar.id)];

    await this.garagePage.garage.block.addCars(car);
    await this.garagePage.garage.page.garageCarsCount();
    await this.garagePage.pagination.checkBtnsDisabled('garage');

    this.garagePage.formCreate.clearInputs();
    this.garagePage.switchInputsDisabled(false);
    this.disactiveBtns('.btn-select', 'active');
  }

  async generateCars(): Promise<void> {
    const count = 100;
    const names = this.garagePage.formCreate.getArrayNames(count);
    const colors = this.garagePage.formCreate.getArrayColors(count);

    const array: CarBlock[] = [];
    let car: CarBlock;

    for (let i = 0; i < count; i++) {
      const newCar: Car = new Car(names[i], colors[i], '0');
      await this.api.createCar(newCar);
      car = new CarBlock(names[i], colors[i], this.api.carId);

      array.push(car);
    }

    this.garagePage.garage.block.addCars(array);
    this.garagePage.garage.page.garageCarsCount();
    this.garagePage.pagination.checkBtnsDisabled('garage');
    this.garagePage.switchInputsDisabled(false);
    this.disactiveBtns('.btn-select', 'active');
  }

  async removeCar(event: Event): Promise<void> {
    const btn = event.target as HTMLElement;
    const id = Number(btn.parentElement?.parentElement?.id);

    const currentCar = document.getElementById(id.toString());

    if (currentCar) {
      this.garagePage.garage.block.removeCar(currentCar);
    }
    this.garagePage.garage.page.garageCarsCount();
    this.api.deleteCar(id, '/garage');

    const isWinner = await this.api.getWinnerStatus(id);

    if (isWinner === 200) {
      this.api.deleteCar(id, '/winners');
      this.scorePage.getWinners();
      this.scorePage.page.scoreCarsCount();
    }

    this.garagePage.switchInputsDisabled(false);
    this.garagePage.pagination.checkBtnsDisabled('garage');
  }

  async checkCarToSelect(event: Event): Promise<void> {
    const btn = event.target as HTMLElement;
    const id = Number(btn.parentElement?.parentElement?.id);
    this.currentCarId = id;

    const car = await this.api.getCar(id) as Car;
    this.currentName = car.name;
    this.currentColor = car.color;
    this.garagePage.formUpdate.setInput(car.name, 'name');
    this.garagePage.formUpdate.setInput(car.color, 'color');

    this.garagePage.switchInputsDisabled(true);

    this.disactiveBtns('.btn-select', 'active');
    btn.classList.add('active');
  }

  async updateCar(id: number): Promise<void> {
    const inputName = document.getElementById('input-name-update') as HTMLInputElement;
    const inputColor = document.getElementById('input-color-update') as HTMLInputElement;
    const carName = await this.garagePage.formUpdate.getCarName();
    const carColor = await this.garagePage.formUpdate.getCarColor();

    let newName = '';
    let newColor = '';

    if (this.currentName !== inputName.value) {
      newName = carName;
    } else {
      newName = this.currentName;
    }
    if (this.currentColor !== inputColor.value) {
      newColor = carColor;
    } else {
      newColor = this.currentColor;
    }

    if (newName || newColor) {
      await this.garagePage.garage.block.updateCar(id.toString(), newName, newColor);
      const newCar: Car = new Car(newName, newColor, id.toString());
      await this.api.updateCar(newCar);
      await this.scorePage.getWinners();
    }

    this.currentCarId = 0;
    this.currentName = '';
    this.currentColor = '';
    this.garagePage.formUpdate.clearInputs();
  }

  async checkCarToMove(event: Event): Promise<void> {
    const btn = event.target as HTMLElement;
    const id = Number(btn.parentElement?.parentElement?.parentElement?.id);
    const car = new CarBlock('', '', id.toString());
    car.hideMessage();

    if (btn.classList.contains('btn-start')) {
      car.startMove(id);
    } else if (btn.classList.contains('btn-stop')) {
      car.stopMove(id);
    }
  }
}
