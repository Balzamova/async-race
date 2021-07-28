import './css/wrapper.css';
import BaseComponent from '../base-component';
import Content from './content';

export default class Wrapper extends BaseComponent {
  private header = new BaseComponent('header', ['header']);

  private content = new Content();

  private footer = new BaseComponent('footer', ['footer']);

  constructor() {
    super('div', ['wrapper']);

    this.element.appendChild(this.header.element);
    this.element.appendChild(this.content.element);
    this.element.appendChild(this.footer.element);

    this.addHeaderContent();
    this.addFooterContent();
  }

  addHeaderContent(): void {
    this.header.element.classList.add('header');
    this.header.element.innerText = 'Async-race';
  }

  addFooterContent(): void {
    this.footer.element.insertAdjacentHTML('afterbegin', `
      <ul class='footer__list'>
        <li class='footer__item'>
          <a class='footer__link' href='https://docs.rs.school/' target='blank'>
            © Rolling Scopes School
          </a>
        </li>
        <li class='footer__item'>
          <a class='footer__link' href='https://github.com/Balzamova/async-race' target='blank'>
            © Anastasiia Balzamova
          </a>
        </li>
      </ul>
    `);
  }
}
