'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch('/fortune')
    // response from server is txt
    .then((response) => response.text())
    .then((fortune) => {
      document.querySelector('#fortune-text').innerHTML = fortune;
    });

}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const userZipcode = document.querySelector('#zipcode-field').value;
  const queryString = new URLSearchParams({ zipcode: userZipcode }).toString();
  const url = `/weather.json?${queryString}`;

  fetch(url)
    .then((response) => response.json())
    .then((weatherInfo) => {
      document.querySelector('#weather-info').innerHTML = weatherInfo.forecast;
    });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();
  // TODO: show the result message after your form
  const formInputs = {
    qty: document.querySelector('#qty-field').value,
    melon_type: document.querySelector('#melon-type-field').value,
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((status) => {
      if(status.code === 'ERROR'){
        //if the result code is ERROR, make it show up in red (see our CSS!)
        document.querySelector('#order-status').classList.add('order-error');
      }
      document.querySelector('#order-status').innerHTML = status.msg;
    });
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);
