import BaseComponent from '../base-component';
import Pagination from '../content/pagination';
import Controls from './controls';
import Form from './form';
import Garage from './garage';

export default class GaragePage extends BaseComponent {
  formCreate = new Form('form-create', 'input-name-create', 'input-color-create', 'Submit');

  formUpdate = new Form('form-update', 'input-name-update', 'input-color-update', 'Update');

  controls = new Controls();

  garage = new Garage();

  pagination = new Pagination('garage-btn');

  constructor() {
    super('div', ['garage-page']);

    this.element.appendChild(this.formCreate.element);
    this.element.appendChild(this.formUpdate.element);
    this.element.appendChild(this.controls.element);
    this.element.appendChild(this.garage.element);
    this.element.appendChild(this.pagination.element);

    this.switchInputsDisabled();
  }

  switchInputsDisabled(state = false): void {
    const update = this.formUpdate.inputName.element as HTMLInputElement;
    const colorUpdate = this.formUpdate.inputColor.element as HTMLInputElement;

    if (update.disabled && colorUpdate.disabled) {
      update.disabled = state;
      colorUpdate.disabled = state;
    }
    update.disabled = !state;
    colorUpdate.disabled = !state;
  }
}
