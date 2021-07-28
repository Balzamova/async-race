import './css/form.css';
import BaseComponent from '../base-component';

export default class Form extends BaseComponent {
  inputName = new BaseComponent('input', ['input']);

  inputColor = new BaseComponent('input', ['color']);

  button = new BaseComponent('button', ['button']);

  constructor(id: string, idInput: string, idColor:string, inner: string) {
    super('div', ['form', `${id}`]);

    this.addComponents(id, idInput, idColor, inner);
  }

  addComponents(id: string, idInput: string, idColor:string, inner: string): void {
    this.element.id = id;
    this.inputName.element.id = idInput;
    this.inputName.element.setAttribute('type', 'text');

    this.inputColor.element.id = idColor;
    this.inputColor.element.setAttribute('type', 'color');

    this.button.element.innerText = inner;
    this.button.element.classList.add(`btn-${inner.toLowerCase()}`);

    this.element.appendChild(this.inputName.element);
    this.element.appendChild(this.inputColor.element);
    this.element.appendChild(this.button.element);
  }

  getCarName(): string {
    const input = this.inputName.element as HTMLInputElement;

    return input.value;
  }

  getCarColor(): string {
    const color = this.inputColor.element as HTMLInputElement;

    return color.value;
  }

  getRandomIndex(elem: string[] | string): number {
    const index: number = Math.floor(Math.random() * elem.length);

    return index;
  }

  getRandomName(): string {
    const names = ['Audi', 'Bentley', 'BMV', 'Tesla', 'Cadillac', 'Ford', 'Lada', 'Jeep', 'Kia', 'Mercedes'];
    const types = ['Sedan', 'Sport', 'Luxury', 'Crossover', 'Electric', 'MPV', 'Cabriolet', 'Coupe', 'SUV', '7'];

    const indName = this.getRandomIndex(names);
    const indType = this.getRandomIndex(types);

    const name = names[indName];
    const type = types[indType];

    return `${name} ${type}`;
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    const maxColorLength = 6;

    for (let i = 0; i < maxColorLength; i++) {
      color += letters[this.getRandomIndex(letters)];
    }

    return color;
  }

  getArrayNames(n: number): string[] {
    const names = [];

    for (let i = 0; i < n; i++) {
      names.push(this.getRandomName());
    }

    return names;
  }

  getArrayColors(n: number): string[] {
    const colors = [];

    for (let i = 0; i < n; i++) {
      colors.push(this.getRandomColor());
    }

    return colors;
  }

  clearInputs(): void {
    const input = this.inputName.element as HTMLInputElement;
    const color = this.inputColor.element as HTMLInputElement;

    input.value = '';
    color.value = '';
  }

  setInput(value: string, type: string): void {
    const input = document.getElementById(`input-${type}-update`) as HTMLInputElement;
    input.value = value;
  }
}
