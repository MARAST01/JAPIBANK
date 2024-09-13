//codigo random
var random = Math.floor(Math.random() * 1000000);
console.log(random);
//codigo para enviar el correo

document.getElementById('message').value = random;
console.log(document.getElementById('message').value);
localStorage.setItem('code', random);

const btn = document.getElementById('button');

// variable que almacena el codigo random sin importar que cambie de archivo



document.getElementById('form')
.addEventListener('submit', function(event) {
event.preventDefault();

btn.value = 'Sending...';

const serviceID = 'default_service';
const templateID = 'template_hsvwna7';


emailjs.sendForm(serviceID, templateID, this)
.then(() => {
  btn.value = 'Send Email';
  
  alert('Sent!');
  cambiarpagina();
}, (err) => {
  btn.value = 'Send Email';
  alert('jj');
});
});

function cambiarpagina(){
  window.location.href = "ingresar.html";
  }

