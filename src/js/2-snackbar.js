import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', submitHandler);
function submitHandler(evt) {
  evt.preventDefault();  
  createPromise(form.elements.delay.value, form.elements.state.value)
    .then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        close: true,
        backgroundColor: '#59A10D',
        messageColor: 'white',
        messageSize: 20,
        //timeout: 0,
        position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      });
    })
    .catch(delay => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        close: true,
        backgroundColor: '#EF4040',
        messageColor: 'white',
        messageSize: 20,
        //timeout: 0,
        position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      });
    });
    form.reset();
}

function createPromise(delay, isResolved) {
  return new Promise((resolve, reject) => {
    console.log();
    setTimeout(() => {
      if (isResolved === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
