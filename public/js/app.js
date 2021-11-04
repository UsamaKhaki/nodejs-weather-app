
// API for getting loaction


const weatherForm = document.querySelector('form');
const weatherInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let value = weatherInput.value;

    if(!value){
        alert("Please provide any address!!");
        return false;
    }

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address='+value).then((res) => {
        res.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                weatherInput.value = "";
            }
        })
    })

});