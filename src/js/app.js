import {settings, select} from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';

  const app = {
    initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    
    thisApp.activatePage(thisApp.pages[0].id);    
   
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    },

    activatePage: function(pageId){
    const thisApp = this;
    /* add class 'active' to matching pages, remove from non-matching*/
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active, 
        link.getAttribute('href') == '#' + pageId
        );
    }
  },

    initMenu: function () {
      const thisApp = this;
      for (let productData in thisApp.data.products) {
        new Product(productData, thisApp.data.products[productData]);
      }
    },
  
    initData: function () {
      const thisApp = this;
  
      thisApp.data = {};
      const url = settings.db.url + '/' + settings.db.products;
      fetch(url)
        .then(function (rawResponse) {
          return rawResponse.json();
        })
        .then(function (parsedResponse) {
          console.log('parsedResponse', parsedResponse);
  
          /* save parsedResponse as thisApp.data.products */
          thisApp.data.products = parsedResponse;
          /* execute initMenu method */
          thisApp.initMenu();
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
    },
  
    init: function () {
      const thisApp = this;
  
      thisApp.initData();
    },
  
    initCart: function () {
      const thisApp = this;
  
      const cartElem = document.querySelector(select.containerOf.cart);
      thisApp.cart = new Cart(cartElem);

      thisApp.productList = document.querySelector(select.containerOf.menu);
      thisApp.productList.addEventListener('add-to-cart', function(event){
        app.cart.add(event.detail.product);
      })
    },
  };
  
  app.init();
  app.initCart();
  app.initPages();

