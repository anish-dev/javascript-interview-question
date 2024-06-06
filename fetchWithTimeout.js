// Here I have implemneted fetch api with timeout

const fetchWithTimeout = (url, options, time) => {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;
    let timeoutId = null;

    fetch(url, { ...options, signal })
      .then((res) => res.json())
      .then((response) => {
        console.log("response", response);
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      })
      .finally(() => {
        console.log("timeoutid", timeoutId);
        clearTimeout(timeoutId);
      });

    timeoutId = setTimeout(() => {
      controller.abort();
    }, time);
  });
};

fetchWithTimeout(
  "https://dummyjson.com/products?limit=10&skip=10&select=title,price",
  {},
  1000
)
  .then((res) => {
    console.log("then", res);
  })
  .catch((err) => {
    console.log("error", err);
  });
