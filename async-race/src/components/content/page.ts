import './css/pages.css';
import BaseComponent from '../base-component';

export default class Page extends BaseComponent {
  header: BaseComponent;

  garageName: BaseComponent;

  garageCount: BaseComponent;

  pages: BaseComponent;

  pageName: BaseComponent;

  pageCount: BaseComponent;

  constructor(parent: string, type: string) {
    super('div', [parent]);

    this.header = new BaseComponent('div', [`${type}-header`]);
    this.garageName = new BaseComponent('div', [`${type}-name`]);
    this.garageCount = new BaseComponent('div', [`${type}-count`]);
    this.pages = new BaseComponent('div', [`${type}-pages`]);
    this.pageName = new BaseComponent('div', [`${type}-page-name`]);
    this.pageCount = new BaseComponent('div', [`${type}-page-count`]);

    this.garageName.element.innerText = 'Garage';
    this.pageName.element.innerText = 'Page';

    this.element.appendChild(this.header.element);
    this.element.appendChild(this.pages.element);

    this.header.element.appendChild(this.garageName.element);
    this.header.element.appendChild(this.garageCount.element);

    this.pages.element.appendChild(this.pageName.element);
    this.pages.element.appendChild(this.pageCount.element);

    this.garagePage();
  }

  garageCarsCount(): void {
    const cars = document.querySelectorAll('.car-block');
    const countElem = document.querySelector('.garage-count') as HTMLElement;
    countElem.innerText = `( ${cars.length} )`;
  }

  garagePage(n = 1): void {
    this.pageCount.element.innerHTML = `# ${n}`;
  }

  scoreCarsCount(): void {
    const cars = document.querySelectorAll('.table-item');
    const countElem = document.querySelector('.score-count') as HTMLElement;
    countElem.innerText = `( ${cars.length} )`;
  }
}
