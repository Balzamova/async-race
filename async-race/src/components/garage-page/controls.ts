import RestApi from '../../rest-api';
import BaseComponent from '../base-component';
import CarBlock from './car-block';

export default class Controls extends BaseComponent {
  raceBtn = new BaseComponent('button', ['button', 'btn-race']);

  resetBtn = new BaseComponent('button', ['button', 'btn-reset']);

  generateBtn = new BaseComponent('button', ['button', 'btn-generate']);

  api = new RestApi();

  constructor() {
    super('div', ['controls']);

    this.raceBtn.element.innerText = 'Race';
    this.resetBtn.element.innerText = 'Reset';
    this.generateBtn.element.innerText = 'Generate';

    this.element.appendChild(this.raceBtn.element);
    this.element.appendChild(this.resetBtn.element);
    this.element.appendChild(this.generateBtn.element);

    this.listen();
  }

  raceBtnDisabled(isRace: boolean): void {
    const start = document.querySelector('.btn-race') as HTMLButtonElement;
    const stop = document.querySelector('.btn-reset') as HTMLButtonElement;

    if (!isRace) {
      start.disabled = false;
      stop.disabled = true;
    } else {
      start.disabled = true;
      stop.disabled = false;
    }
  }

  listen(): void {
    this.element.addEventListener('click', async (event) => {
      if (event.target instanceof EventTarget) {
        const elem = event.target as HTMLElement;

        if (elem.classList.contains('btn-race')) {
          this.checkCarsToRace('start');
        }

        if (elem.classList.contains('btn-reset')) {
          this.checkCarsToRace('stop');
        }
      }
    });
  }

  checkCarsToRace(action: string): void {
    const page = document.querySelector('.garage-page-count') as HTMLDivElement;
    const inner = page.innerHTML;
    const pageNumber = +inner.slice(2);
    const cars = document.querySelectorAll('.car-block');
    const ids: number[] = [];

    const firstCarOnPage = (pageNumber - 1) * 7;
    const lastCarOnPage = pageNumber * 7 - 1;

    for (let i = firstCarOnPage; i <= lastCarOnPage; i++) {
      if (cars[i]) {
        const id = +cars[i].id;
        ids.push(id);
      }
    }

    if (action === 'start') {
      new CarBlock('', '', '').startRace(ids);
    } else {
      new CarBlock('', '', '').stopRace(ids);
    }

    new CarBlock('', '', '').hideMessage();
  }
}
