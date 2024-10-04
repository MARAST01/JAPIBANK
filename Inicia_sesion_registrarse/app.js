const fondo = document.querySelector(".fondo");
const loginlink = document.querySelector(".login-link");
const registrarlink = document.querySelector(".registrar-link");
const btn = document.querySelector(".btn");
const iconocerrar = document.querySelector(".icono-cerrar");
const olvide = document.querySelector(".olvide-link");
const btn_i_s = document.querySelector(".btn_i_s");
// Variables globales para almacenar los datos
let rnombre = 'Carlos';
let rapellido = 'Delgado';
let rcedula = '1234567890';
let rcelular = '3123456789';
let rgmail = 'lljuanjosegallegocalderonll@gmail.com';
let rpassword = '1234';
let rconfirmPassword = '1234';
let raceptaTerminos = false;
olvide.addEventListener("click", () => {
    window.location.href = "../olvida/olvida.html";
});
registrarlink.addEventListener("click", () => {
    fondo.classList.add('active');
});

loginlink.addEventListener("click", () => {
    fondo.classList.remove('active');
    
});

password = document.querySelector('#password_r');
confirm_password = document.querySelector('#confirm_password_r');
btn_r = document.querySelector('.btn_re');
confirm_password.addEventListener('input', function(){
    if(password.value === confirm_password.value){
        btn_r.disabled = false;
    }else{
        btn_r.disabled = true;
    }
});
password.addEventListener('input', function(){
    if(password.value === confirm_password.value){
        btn_r.disabled = false;
    }else{
        btn_r.disabled = true;
    }
});

btn.addEventListener("click", () => {
    fondo.classList.add('active-btn');
    //usuario por defecto
    //localStorage.setItem('nombre', rnombre);
    //localStorage.setItem('apellido', rapellido);
    //localStorage.setItem('cedula', rcedula);
    //localStorage.setItem('celular', rcelular);
    //localStorage.setItem('gmail', rgmail);
    //localStorage.setItem('password', rpassword);
    //localStorage.setItem('confirmPassword', rconfirmPassword);
    //localStorage.setItem('aceptaTerminos', raceptaTerminos);
});

iconocerrar.addEventListener("click", () => {
    fondo.classList.remove('active-btn');
}); 
// document.getElementById('btn_i_s').addEventListener('click', function(event) {
//     event.preventDefault(); // Evita que el formulario se envíe por defecto

//     // Obtener los valores de los campos del formulario
//     const emailInput = document.querySelector('input[type="email"]').value;
//     const passwordInput = document.getElementById('password-input').value;

//     // Recuperar los valores almacenados en localStorage
//     const storedEmail = localStorage.getItem('gmail');
//     const storedPassword = localStorage.getItem('password');

//     // Comparar los valores del formulario con los valores de localStorage
//     if (emailInput === storedEmail && passwordInput === storedPassword) {
//         alert('¡Inicio de sesión exitoso!');

//     } else if (emailInput === rgmail && passwordInput === rpassword) {
//         alert('¡Inicio de sesión exitoso!');
        
//     } else {
//         alert('Correo electrónico o contraseña incorrectos.');
//     }
// });
// boton de registro
// document.addEventListener('DOMContentLoaded', (event) => {
//     // Selecciona el botón y los campos por su id
//     const btnRegistrarse = document.getElementById('btn_r');
//     const nombreInput = document.getElementById('nombre_r');
//     const apellidoInput = document.getElementById('apellido_r');
//     const cedulaInput = document.getElementById('cedula_r');
//     const celularInput = document.getElementById('celular_r');
//     const gmailInput = document.getElementById('gmail_r');
//     const passwordInput = document.getElementById('password_r');
//     const confirmPasswordInput = document.getElementById('confir_password_r');
//     const checkbox = document.getElementById('checkbox_r');
//     // Función que se ejecuta cuando se hace clic en el botón
//     btnRegistrarse.addEventListener('click', () => {
//         // Prevenir el envío del formulario si es necesario
        

//         // Asignar los valores de los campos a las variables globales
//         rnombre = nombreInput.value;
//         rapellido = apellidoInput.value;
//         rcedula = cedulaInput.value;
//         rcelular = celularInput.value;
//         rgmail = gmailInput.value;
//         rpassword = passwordInput.value;
//         rconfirmPassword = confirmPasswordInput.value;
//         raceptaTerminos = checkbox.checked;
        
//         // Guardar los valores en localStorage si la contraseña coincide
//         if (rpassword === rconfirmPassword) {
//             // Guardar los valores en localStorage si las contraseñas coinciden
//             localStorage.setItem('nombre', rnombre);
//             localStorage.setItem('apellido', rapellido);
//             localStorage.setItem('cedula', rcedula);
//             localStorage.setItem('celular', rcelular);
//             localStorage.setItem('gmail', rgmail);
//             localStorage.setItem('password', rpassword);
//             localStorage.setItem('confirmPassword', rconfirmPassword);
//             localStorage.setItem('aceptaTerminos', raceptaTerminos);
    
//             alert('¡Registro completado correctamente!');
//         } else {
//             // Mostrar una alerta si las contraseñas no coinciden
//             alert('Las contraseñas no coinciden. Por favor, verifique e intente de nuevo.');
//         }

//     });
// });
document.getElementById('toggle-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('password-input');
    const icon = this;

    // Alternar el tipo de input entre 'password' y 'text'
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text'; // Mostrar la contraseña
        icon.classList.remove('fa-lock'); // Cambiar al candado abierto
        icon.classList.add('fa-lock-open');
    } else {
        passwordInput.type = 'password'; // Ocultar la contraseña
        icon.classList.remove('fa-lock-open'); // Cambiar al candado cerrado
        icon.classList.add('fa-lock');
    }
});


document.getElementById('toggle-password_r').addEventListener('click', function() {
    const passwordInput = document.getElementById('password_r');
    const icon = document.getElementsByClassName('reg')[0];

    // Alternar el tipo de input entre 'password' y 'text'
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text'; // Mostrar la contraseña
        icon.classList.remove('fa-lock'); // Cambiar al candado abierto
        icon.classList.add('fa-lock-open');
    } else {
        passwordInput.type = 'password'; // Ocultar la contraseña
        icon.classList.remove('fa-lock-open'); // Cambiar al candado cerrado
        icon.classList.add('fa-lock');
    }
});

document.getElementById('toggle-password_rc').addEventListener('click', function() {
    const passwordInput = document.getElementById('confirm_password_r');
    const icon = document.getElementsByClassName('creg')[0];

    // Alternar el tipo de input entre 'password' y 'text'
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text'; // Mostrar la contraseña
        icon.classList.remove('fa-lock'); // Cambiar al candado abierto
        icon.classList.add('fa-lock-open');
    } else {
        passwordInput.type = 'password'; // Ocultar la contraseña
        icon.classList.remove('fa-lock-open'); // Cambiar al candado cerrado
        icon.classList.add('fa-lock');
    }

});