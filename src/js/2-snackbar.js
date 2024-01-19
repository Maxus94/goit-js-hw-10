const form = document.querySelector('.form');
form.addEventListener("submit", submitHandler);
function submitHandler(evt){
    evt.preventDefault();
    console.log(form.elements);
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (isSuccess) {
            resolve("Success! Value passed to resolve function");
          } else {
            reject("Error! Error passed to reject function");
          }
        }, 2000);
      });
}


function createPromiseClickHandler(evt) {
    evt.preventDefault();
    iziToast.destroy();  
    for (let i = 1; i <= Number(numberOfDelaysField.value); i++) {
      createPromise(
        i,
        Number(firstDelayField.value) + Number(stepOfDelayField.value) * (i - 1)
      )
        .then(({ position, delay }) => {
          //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          iziToast.show({
            message: `✅ Fulfilled promise ${position} in ${delay}ms`,
            close: true,
            backgroundColor: 'green',
            messageColor: 'white',
            messageSize: 20,
            //timeout: 0,
            position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
          });
        })
        .catch(({ position, delay }) => {
          //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          iziToast.show({
            message: `❌ Rejected promise ${position} in ${delay}ms`,
            close: true,
            backgroundColor: 'red',
            messageColor: 'white',
            messageSize: 20,
            //timeout: 0,
            position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
          });
        });
    }
    form.reset();
  }
  
  function createPromise(delay) {
    return new Promise((resolve, reject) => {
      console.log();
        setTimeout(() => {
        if (shouldResolve) {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }