import { templates } from '../settings.js';

class Home {
  constructor(element) {
    const thisHome = this;

    thisHome.render(element);
  }

  render(element) {
    const thisHome = this;

    /* generate HTML based on template */
    const generatedHTML = templates.homePage(element);

    // create empty object thisHome.dom
    thisHome.dom = {};

    // add new property to thisHome.dom object
    thisHome.dom.wrapper = element;

    // add innerHTML of the wrapper using generatedHTML
    thisHome.dom.wrapper.innerHTML = generatedHTML;
  }
}
export default Home;
