import BaseComponent from '../base-component';

export default class Navigation extends BaseComponent {
  btnToGarage = new BaseComponent('button', ['button', 'btn-to-garage', 'active']);

  btnToWinners = new BaseComponent('button', ['button', 'btn-to-winners']);

  constructor() {
    super('div', ['navigation']);

    this.btnToGarage.element.innerText = 'To Garage';
    this.btnToWinners.element.innerText = 'To Winners';

    this.element.appendChild(this.btnToGarage.element);
    this.element.appendChild(this.btnToWinners.element);
  }

  toGarage(): void {
    this.btnToGarage.element.classList.add('active');
    this.btnToWinners.element.classList.remove('active');
  }

  toWinners(): void {
    this.btnToGarage.element.classList.remove('active');
    this.btnToWinners.element.classList.add('active');
  }
}
