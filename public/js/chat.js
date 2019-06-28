const socket = io();

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');


socket.on('message',(message) => {
  console.log(message);
});


$messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  $messageFormButton.setAttribute('disabled','disabled');

  const message = document.querySelector('input').value;

  socket.emit('sendMessage',message,() => {

    $messageFormButton.removeAttribute('disabled');
    $messageFormInput.value = '';
    $messageFormInput.focus();

    console.log('The message was delivered');
  });

});


document.querySelector('#send-location').addEventListener('click', () => {
  if(!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  $sendLocationButton.setAttribute('disabled','disabled');

navigator.geolocation.getCurrentPosition((position) => {
  console.log(position);
  socket.emit('sendlocation', {
    latitude : position.coords.latitude,
    longitude : position.coords.longitude
  },() => {
    $sendLocationButton.removeAttribute('disabled');
    console.log('Location Shared!');
  });
});

});
