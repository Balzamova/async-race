import './css/loader.css';
import BaseComponent from '../base-component';

export default class Loader extends BaseComponent {
  constructor() {
    super('div', ['loader__container']);

    const loader = `
      <h2 class="loader__title">Loading...</h2>
      <div class="loader">
        <span class="loader__element"></span>
        <span class="loader__element"></span>
        <span class="loader__element"></span>
      </div>
    `;

    this.element.insertAdjacentHTML('beforeend', loader);
  }
}
