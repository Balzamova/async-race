import BaseComponent from '../base-component';

export default class Pagination extends BaseComponent {
  next: BaseComponent;

  prev: BaseComponent;

  page = {
    garage: 'garage',
    score: 'score',
  };

  currentPage = 1;

  constructor(type: string) {
    super('div', ['pagination', type]);

    this.prev = new BaseComponent('button', ['button', 'btn-prev', type]);
    this.next = new BaseComponent('button', ['button', 'btn-next', type]);

    this.prev.element.innerText = 'Previous';
    this.next.element.innerText = 'Next';

    this.element.appendChild(this.prev.element);
    this.element.appendChild(this.next.element);

    this.checkBtnsDisabled(this.page.garage);
    this.checkBtnsDisabled(this.page.score);
  }

  getMaxPageCount(page: string): number {
    let maxCarPerPage;
    let cars;

    if (page === this.page.garage) {
      maxCarPerPage = 7;
      cars = document.querySelectorAll('.car-block');
    } else {
      maxCarPerPage = 10;
      cars = document.querySelectorAll('.table-item');
    }

    const count = Math.ceil(cars.length / maxCarPerPage);

    return count;
  }

  checkBtnsDisabled(page: string): void {
    const next = this.next.element as HTMLButtonElement;
    const prev = this.prev.element as HTMLButtonElement;
    const maxPage = this.getMaxPageCount(page);

    if (this.currentPage === 1) {
      prev.disabled = true;
      next.disabled = false;
    } else if (this.currentPage === maxPage) {
      prev.disabled = false;
      next.disabled = true;
    } else {
      prev.disabled = false;
      next.disabled = false;
    }

    if (maxPage === 1) {
      prev.disabled = true;
      next.disabled = true;
    }
  }

  slide(page: string, direction: string): void {
    let wrapper;
    let block;

    if (page === this.page.garage) {
      wrapper = document.querySelector('.cars-wrapper') as HTMLDivElement;
      block = document.querySelector('.garage-block') as HTMLDivElement;
    } else {
      wrapper = document.querySelector('.table') as HTMLDivElement;
      block = document.querySelector('.score-table') as HTMLDivElement;
    }

    const blockHeight = block?.clientHeight;
    const maxPageCount = this.getMaxPageCount(page);

    if (direction === 'next') {
      if (this.currentPage < maxPageCount) {
        this.currentPage++;
      }
    } else {
      this.currentPage--;
    }

    wrapper.style.top = `calc(0px - ${blockHeight * (this.currentPage - 1)}px)`;
    this.checkBtnsDisabled(page);
  }
}
