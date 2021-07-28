import './css/table.css';
import BaseComponent from '../base-component';

export default class Table extends BaseComponent {
  table = new BaseComponent('div', ['table']);

  constructor() {
    super('div', ['score-table']);

    this.element.appendChild(this.table.element);
  }
}
