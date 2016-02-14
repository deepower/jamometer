'use strict';
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('error');
  }, 1000);
});

promise
  .then(
    result => {
      console.log('all good! ' + result);
    },
    error => {
      console.log('bad! ' + error);
    }
  );
