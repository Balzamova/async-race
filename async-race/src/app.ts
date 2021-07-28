import './style.css';
import Wrapper from './components/content/wrapper';

export default class App {
  private readonly baseWrapper: Wrapper;

  constructor(private readonly rootElement: Element) {
    this.baseWrapper = new Wrapper();

    this.rootElement.appendChild(this.baseWrapper.element);
  }
}
