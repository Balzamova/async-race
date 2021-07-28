import BaseComponent from '../base-component';
import Page from '../content/page';
import GarageBlock from './garage-block';

export default class Garage extends BaseComponent {
  page = new Page('garage', 'garage');

  block = new GarageBlock();

  constructor() {
    super('div', ['garage']);

    this.element.appendChild(this.page.element);
    this.element.appendChild(this.block.element);
  }
}
