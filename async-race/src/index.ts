import './style.css';
import App from './app';
import RestApi from './rest-api';
import Loader from './components/content/loader';

window.onload = () => {
  async function load() {
    const appElement = document.querySelector('body');
    if (!appElement) {
      throw Error('App element not found');
    }

    const loader = new Loader();
    const api = new RestApi();

    appElement.append(loader.element);

    const data = await api.getCars();

    setTimeout(() => {
      new App(appElement);
      api.getCarArray(data);
      appElement.removeChild(loader.element);
    }, 1000);
  }

  load();
};
