'use strict';
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('result');
  }, 1000);
});

promise
  .then(
    result => {
      console.log('all good! ' + result);
      return 5;
    },
    error => {
      console.log('bad! ' + error);
    }
  )
  .then(num => {
    console.log(num);
    return 'more results down the way'
  })
  .then(texts => {
    console.log(texts);
  });
