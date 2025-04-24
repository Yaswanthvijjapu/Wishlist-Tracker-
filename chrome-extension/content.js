const productNameEl = document.querySelector('h1');
const productCategoryEl = document.querySelector('.category');
const productPriceEl = document.querySelector('.price');

const productName = productNameEl ? productNameEl.innerText : 'Unknown Product';
const productCategory = productCategoryEl ? productCategoryEl.innerText : 'Uncategorized';
const productPrice = productPriceEl ? productPriceEl.innerText : 'N/A';

chrome.runtime.onConnect.addListener(function (port) {
  port.postMessage({
    name: productName,
    category: productCategory,
    price: productPrice,
  });
});
