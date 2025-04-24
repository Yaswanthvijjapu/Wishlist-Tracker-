let port = null;

chrome.runtime.onConnect.addListener(function (p) {
  port = p;
  port.onMessage.addListener(function (msg) {
    if (msg.name && msg.category && msg.price) {
      chrome.storage.local.set({ productData: msg });
    }
  });
});
