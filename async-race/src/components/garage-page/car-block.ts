import './css/car-block.css';
import BaseComponent from '../base-component';
import RestApi from '../../rest-api';
import store from '../../store';
import Controls from './controls';
import ScorePage from '../score-page/score-page';
import Winner from './winner';
import Position from './position';
import Car from './car';

export default class CarBlock extends BaseComponent {
  select = new BaseComponent('div', ['car-select']);

  selectBtn = new BaseComponent('button', ['button', 'btn-select']);

  removeBtn = new BaseComponent('button', ['button', 'btn-remove']);

  name = new BaseComponent('div', ['car-name']);

  roadBlock = new BaseComponent('div', ['car-road-block']);

  roadBtns = new BaseComponent('div', ['road-btns']);

  start = new BaseComponent('button', ['btn-start', 'active']);

  stop = new BaseComponent('button', ['btn-stop']);

  road = new BaseComponent('div', ['road']);

  car = new BaseComponent('div', ['car']);

  flag = new BaseComponent('div', ['flag']);

  api = new RestApi();

  isWinner = true;

  isRace = false;

  constructor(name: string, color: string, id: string) {
    super('div', ['car-block']);

    this.addComponentsToBlock(name, color, id);
  }

  addComponentsToBlock(name: string, color: string, id: string): void {
    this.name.element.innerText = name;

    this.selectBtn.element.innerText = 'Select';
    this.removeBtn.element.innerText = 'Remove';
    this.start.element.innerText = 'A';
    this.stop.element.innerText = 'B';

    this.element.id = id;
    this.name.element.id = `car-name-${id}`;
    this.car.element.id = `car-${id}`;
    this.start.element.id = `btn-start-${id}`;
    this.stop.element.id = `btn-stop-${id}`;
    this.flag.element.id = `flag-${id}`;

    const stop = this.stop.element as HTMLButtonElement;
    stop.disabled = true;

    this.element.appendChild(this.select.element);
    this.element.appendChild(this.roadBlock.element);

    this.select.element.appendChild(this.selectBtn.element);
    this.select.element.appendChild(this.removeBtn.element);
    this.select.element.appendChild(this.name.element);

    this.roadBlock.element.appendChild(this.roadBtns.element);
    this.roadBlock.element.appendChild(this.road.element);

    this.roadBtns.element.appendChild(this.start.element);
    this.roadBtns.element.appendChild(this.stop.element);
    this.road.element.appendChild(this.car.element);
    this.road.element.appendChild(this.flag.element);

    this.car.element.insertAdjacentHTML('afterbegin', this.renderCarImage(color, id));
    this.flag.element.insertAdjacentHTML('afterbegin', this.renderFlag());
  }

  renderCarImage(color: string, id: string): string {
    const svg = `
      <svg id='svg-${id}' style='fill:${color};' version='1.1' xmlns='http://www.w3.org/2000/svg' 
      xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 460.384 460.384' xml:space='preserve'>
        <g >
          <path d='M95.252,283.11c-13.807,0-25.039,11.232-25.039,25.039s11.232,25.039,25.039,25.039s25.039-11.233,
          25.039-25.039 S109.059,283.11,95.252,283.11z M95.252,318.188c-5.536,
          0-10.039-4.504-10.039-10.039s4.503-10.039, 10.039-10.039 s10.039,4.503,10.039,10.039S100.788,
          318.188,95.252,318.188z'/>
          <path d='M357.012,283.11c-13.807,0-25.04,11.232-25.04,25.039s11.233,25.039,25.04,25.039c13.806,0,
            25.038-11.233,25.038-25.039 S370.818,283.11,357.012,283.11z M357.012,318.188c-5.536,
            0-10.04-4.504-10.04-10.039s4.504-10.039, 10.04-10.039
            c5.535,0,10.038,4.503,10.038,10.039S362.547,318.188,357.012,318.188z'/>
          <path d='M409.227,196.421l-66.917-7.645l-35.714-58.056c-10.905-17.728-30.61-28.741-51.424-28.741H133.676
            c-34.925,0-65.792,23.518-75.063,57.193l-0.948,3.445c-4.607,16.733-17.845,30.052-34.549,34.762
            C9.506,201.217,0,213.773,0,227.914v83.012c0,4.142,3.358,7.5,7.5,7.5h38.557c4.757,22.798,25.006,
            39.978,49.195,39.978 s44.438-17.18,49.195-39.978h163.37c4.757,22.798,25.006,39.978,49.195,
            39.978s44.438-17.18,49.195-39.978h40.477 c3.813,0,7.02-2.861,7.452-6.65l5.874-51.483C463.614,228.69,
            440.834,200.037,
            409.227,196.421z M15,294.313h31.949 c-0.843,2.938-1.43,5.983-1.724,9.113H15V294.313z M95.252,
            343.404c-19.44,0-35.255-15.815-35.255-35.255 s15.815-35.256,35.255-35.256s35.255,15.816,35.255,
            35.256S114.692,343.404,95.252,343.404z M357.012,343.404
            c-19.44,0-35.255-15.815-35.255-35.255s15.815-35.256,35.255-35.256s35.255,15.816,
            35.255,35.256S376.452,343.404,357.012,343.404z M357.012,257.893c-16.987,0-32.021,8.48-41.122,
            21.42H182.425c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h126.284
            c-0.843,2.938-1.43,5.983-1.724,9.113H145.279c-2.389-25.504-23.909-45.533-50.027-45.533c-16.987,0-32.021,
            8.48-41.122,21.42H15 v-51.399c0-7.455,5.012-14.075,12.187-16.098c21.728-6.126,38.947-23.452,
            44.94-45.218l0.948-3.445 c7.484-27.186,32.405-46.174,60.601-46.174h121.496c15.643,0,30.452,8.277,38.647,
            21.6l37.626,61.164 c1.207,1.962,3.249,3.26,5.537,3.522l70.541,8.059c16.002,1.831,28.943,12.335,34.67,
            26.276h-23.413c-4.142,0-7.5, 3.358-7.5,7.5 s3.358,7.5,7.5,7.5h26.578c0.052,1.975-0.023,3.975-0.253,
            5.993l-2.364, 20.72h-44.608 C389.033,266.373,373.998,257.893,357.012,257.893z M407.038,
            303.426c-0.293-3.13-0.881-6.175-1.724-9.113h35.716l-1.04,9.113 H407.038z'/>
          <path d='M255.565,215.222h-15.76c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h15.76c4.142,0,7.5-3.358,7.5-7.5
            S259.708,215.222,255.565,215.222z'/>
          <path d='M154.846,222.722c0-4.142-3.358-7.5-7.5-7.5h-15.76c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h15.76
            C151.488,230.222,154.846,226.864,154.846,222.722z'/>
          <path d='M164.136,283.941c-1.314-3.113-4.658-5.069-8.025-4.546c-3.049,0.474-5.522,2.768-6.213,5.776
            c-1.496,6.51,6.051,11.564,11.54,7.829C164.343,291.024,165.476,287.186,164.136,283.941
            C163.946,283.491,164.326,284.401,164.136,283.941z'/>
          <path d='M286.014,143.391c-6.531-10.637-18.348-17.245-30.841-17.245h-121.5c-24.087,0-45.371,
            16.217-51.761,39.443l-0.943,3.438 c-2.468,8.956-6.268,24.34-6.429,24.991c-0.553,2.238-0.045,4.606,1.376,
            6.422c1.422,1.815,3.599,2.876,5.905,2.876h227.64 c2.717,0,5.222-1.469,6.547-3.841c1.326-2.372,
            1.265-5.275-0.159-7.589L286.014,143.391z M199.352,141.145v47.169h-69.054v-47.018 c1.115-0.098,
            2.24-0.151,3.375-0.151H199.352z M95.432,173.002l0.944-3.441c2.86-10.395,
            9.865-18.839,18.922-23.747v42.499H91.432 C92.697,183.321,94.242,177.323,95.432, 173.002z M214.352,
            188.314v-47.169h40.821c7.316,0,14.235,3.868,18.062,10.1l22.807,37.069 H214.352z'/>
        </g>
      </svg>
    `;

    return svg;
  }

  renderFlag(): string {
    const svg = `
      <svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' 
        x='0px' y='0px' viewBox='0 0 498.4 498.4' style='enable-background:new 0 0 498.4 498.4;' xml:space='preserve'>
        <path style='fill:#009AAF;' 
        d='M333.6,426.4v-20.8c0-10.4-5.6-19.2-16-19.2s-16,8.8-16,19.2v20.8h-48v-20.8c0-10.4-5.6-19.2-16-19.2
        s-16,8.8-16,19.2v20.8h-48v-20.8c0-10.4-5.6-19.2-16-19.2s-16,8.8-16,
        19.2v20.8h-48v-20.8c0-10.4-5.6-19.2-16-19.2s-16,8.8-16,19.2 v20.8l0,0v72h272V426.4L333.6,426.4z'/>
        <path style='fill:#006884;' d='M333.6,498.4v-72l0,0v-20.8c0-10.4-5.6-19.2-16-19.2s-16,8.8-16,19.2v20.8h-48v-20.8
          c0-10.4-5.6-19.2-16-19.2s-16,8.8-16,19.2v20.8h-48v-20.8c0-10.4-5.6-19.2-16-19.2s-16,8.8-16,19.2v20.8h-48'/>
        <path style='fill:#EAAA0A;' d='M125.6,418.4v-348c0-4.8-3.2-8.8-8-8.8s-8,4-8,8.8v348H125.6z'/>
        <circle style='fill:#FF5512;' cx='116' cy='24.8' r='24.8'/>
        <ellipse transform='matrix(0.6454 -0.7638 0.7638 0.6454 27.7038 83.7364)' style='fill:#FFCDBD;' cx='104.044' 
        cy='12.029' rx='9.6' ry='3.2'/>
        <path style='fill:#CC3006;' d='M133.6,7.2c9.6,9.6,9.6,25.6,0,35.2s-25.6,9.6-35.2,0'/>
        <g>
          <polygon style='fill:#FF5512;' points='133.6,72.8 133.6,191.2 349.6,131.2'/>
          <polygon style='fill:#FF5512;' points='277.6,185.6 277.6,273.6 436.8,229.6'/>
        </g>
        <polygon style='fill:#CC3006;' points='349.6,131.2 349.6,205.6 215.2,168 '/>
        <g>
          <circle style='fill:#FFFFFF;' cx='141.6' cy='468' r='8.8'/>
          <circle style='fill:#FFFFFF;' cx='197.6' cy='468' r='8.8'/>
          <circle style='fill:#FFFFFF;' cx='253.6' cy='468' r='8.8'/>
        </g>
      </svg>
    `;

    return svg;
  }

  async getTimeToMove(id: number): Promise<number> {
    const { velocity, distance } = await this.api.startEngine(id);
    const time = Math.round(distance / velocity);

    return time;
  }

  getPosition(element: string): Position {
    const elem = document.getElementById(element) as HTMLElement;
    const {
      top,
      left,
      width,
      height,
    } = elem.getBoundingClientRect();

    const x = left + width / 2;
    const y = top + height / 2;
    const obj = new Position(x, y);

    return obj;
  }

  getDistance(id: number): number {
    const distAfterFlag = 60;
    const carPosition = this.getPosition(`car-${id}`);
    const flagPosition = this.getPosition(`flag-${id}`);

    const [carX, carY] = Object.values(carPosition);
    const [flagX, flagY] = Object.values(flagPosition);

    const distance = Math.hypot(carX - flagX, carY - flagY) + distAfterFlag;
    return distance;
  }

  animation(id: number, distance: number, animationTime: number): number {
    const car = document.getElementById(`car-${id}`) as HTMLDivElement;
    let start = 0;

    function step(timestamp: number) {
      if (!start) { start = timestamp; }
      const time = timestamp - start;
      const passed = Math.round(time * (distance / animationTime));

      car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

      if (passed < distance) {
        store.animation[id] = window.requestAnimationFrame(step);
      }
    }

    store.animation[id] = window.requestAnimationFrame(step);
    return store.animation[id];
  }

  async moveCar(id: number): Promise<void> {
    const time = await this.getTimeToMove(id);
    const distance = this.getDistance(id);

    this.animation(id, distance, time);

    const result = await this.api.drive(id);
    const value = Object.values(result);

    if (!value[0]) {
      const ind = store.animation[id];
      window.cancelAnimationFrame(ind);
    }

    if (this.isRace && value[0] && this.isWinner) {
      const winner = this.checkWinner(id, time);
      this.saveWinner(winner);
      this.isRace = false;
    }
  }

  async stopCar(id: number): Promise<void> {
    const car = document.getElementById(`car-${id}`) as HTMLDivElement;
    await this.api.stopEngine(id);

    if (store.animation[id]) {
      const ind = store.animation[id];
      window.cancelAnimationFrame(ind);
    }

    car.style.transform = 'translateX(0)';
  }

  async startMove(id: number): Promise<void> {
    const start = document.getElementById(`btn-start-${id}`) as HTMLButtonElement;
    const stop = document.getElementById(`btn-stop-${id}`) as HTMLButtonElement;

    start.disabled = true;
    start.classList.toggle('active');

    this.moveCar(id);

    stop.disabled = false;
    stop.classList.toggle('active');
  }

  async stopMove(id: number): Promise<void> {
    const stop = document.getElementById(`btn-stop-${id}`) as HTMLButtonElement;
    const start = document.getElementById(`btn-start-${id}`) as HTMLButtonElement;

    this.stopCar(id);

    stop.disabled = true;
    start.disabled = false;
    stop.classList.toggle('active');
    start.classList.toggle('active');
  }

  async startRace(ids: number[]): Promise<void> {
    new Controls().raceBtnDisabled(true);
    this.isWinner = true;
    this.isRace = true;

    ids.map(async (id) => {
      this.moveCar(id);
    });
  }

  async stopRace(ids: number[]): Promise<void> {
    ids.forEach(async (id) => {
      this.stopCar(id);
    });

    this.isRace = false;
    this.isWinner = false;
    new Controls().raceBtnDisabled(false);
  }

  checkWinner(id: number, time: number): Winner {
    this.isWinner = false;
    const winner = new Winner(id, time);

    return winner;
  }

  async saveWinner(winner: Winner): Promise<void> {
    const time = +(winner.time / 1000).toFixed(2);

    this.showMessage(winner, time);
    await this.api.saveWinner(+winner.id, time);
    await new ScorePage().getWinners();
  }

  async showMessage(winner: Winner, time: number): Promise<void> {
    const message = document.querySelector('.message') as HTMLDivElement;
    const car = await this.api.getCar(+winner.id) as Car;

    message.innerText = `${car.name} went first in ${time}s!`;
    message?.classList.add('visible');
  }

  hideMessage(): void {
    const message = document.querySelector('.message');
    message?.classList.remove('visible');
  }
}
