import RestApi from '../../rest-api';
import BaseComponent from '../base-component';
import Page from '../content/page';
import Pagination from '../content/pagination';
import Table from './table';
import TableItem from './table-item';

export default class ScorePage extends BaseComponent {
  page = new Page('score-page', 'score');

  header = new BaseComponent('tr', ['table-header']);

  headerNumber = new BaseComponent('th', []);

  headerCar = new BaseComponent('th', []);

  headerName = new BaseComponent('th', []);

  headerWins = new BaseComponent('th', ['table-btn', 'table-btn-win']);

  headerTime = new BaseComponent('th', ['table-btn', 'table-btn-time']);

  arrowWin = new BaseComponent('div', ['arrow-win']);

  arrowTime = new BaseComponent('div', ['arrow-time']);

  table = new Table();

  pagination = new Pagination('score');

  api = new RestApi();

  constructor() {
    super('div', ['score-page', 'none']);

    this.addComponents();
  }

  addComponents(): void {
    this.element.appendChild(this.page.element);
    this.element.appendChild(this.header.element);
    this.element.appendChild(this.table.element);
    this.element.appendChild(this.pagination.element);

    this.headerNumber.element.innerText = '№';
    this.headerCar.element.innerText = 'Car';
    this.headerName.element.innerText = 'Name';

    this.headerWins.element.innerText = 'Win';
    this.headerTime.element.innerText = 'Best time(sec)';

    this.header.element.appendChild(this.headerNumber.element);
    this.header.element.appendChild(this.headerCar.element);
    this.header.element.appendChild(this.headerName.element);
    this.header.element.appendChild(this.headerWins.element);
    this.header.element.appendChild(this.headerTime.element);
    this.headerWins.element.appendChild(this.arrowWin.element);
    this.headerTime.element.appendChild(this.arrowTime.element);
    this.sort();
  }

  async getWinners(): Promise<void> {
    const winners = await this.api.getWinners();
    const ids: number[] = [];

    for (let i = 0; i < winners.length; i++) {
      const id = +winners[i].id;
      ids.push(id);
    }

    const items: TableItem[] = [];

    for (let i = 0; i < ids.length; i++) {
      const winner = new TableItem(+ids[i], i);
      items.push(winner);
    }

    this.updateScoreTable(items);
  }

  updateScoreTable(items: TableItem[]): void {
    const table = document.querySelector('.table') as HTMLDivElement;
    const children = document.querySelectorAll('.table-item');

    children.forEach((el) => { table.removeChild(el); });

    items.forEach((el) => { table.appendChild(el.element); });

    new ScorePage().page.scoreCarsCount();
  }

  sortBy(type: string): void {
    let arrow;

    if (type === 'wins') {
      arrow = this.arrowWin.element;
    } else {
      arrow = this.arrowTime.element;
    }

    const allWins = document.querySelectorAll(`.score-${type}`);
    const wins = [];

    for (let i = 0; i < allWins.length; i++) {
      const win = +allWins[i].innerHTML;
      const id = +allWins[i].id.slice(11);

      wins.push([win, id]);
    }

    if (arrow.classList.contains('up')) {
      wins.sort((a, b) => a[0] - b[0]);
    } else {
      wins.sort((a, b) => b[0] - a[0]);
    }

    const sorted: TableItem[] = [];

    for (let i = 0; i < wins.length; i++) {
      const winner = new TableItem(+wins[i][1], i);
      sorted.push(winner);
    }

    this.updateScoreTable(sorted);
  }

  sort(): void {
    this.element.addEventListener('click', async (event) => {
      if (event.target instanceof EventTarget) {
        const elem = event.target as HTMLElement;

        if (elem.classList.contains('table-btn-win')) {
          this.arrowWin.element.classList.toggle('up');
          this.sortBy('wins');
        }

        if (elem.classList.contains('table-btn-time')) {
          this.arrowTime.element.classList.toggle('up');
          this.sortBy('time');
        }
      }
    });
  }
}
