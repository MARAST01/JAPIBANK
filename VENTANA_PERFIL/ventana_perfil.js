console.log(localStorage.getItem("usuario"));
const nombreApellido = JSON.parse(localStorage.getItem("usuario")).nombre + " " + JSON.parse(localStorage.getItem("usuario")).apellido;
const correo = JSON.parse(localStorage.getItem("usuario")).correo;
const telefono = JSON.parse(localStorage.getItem("usuario")).celular;

document.querySelector('#nombre').innerHTML = nombreApellido;
document.querySelector('#correo').innerHTML = correo;
document.querySelector('#telefono').innerHTML = telefono;

// document.querySelector('#cerrar-sesion').addEventListener('click', () => {
//     fetch('/logout', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => {
//         if (response.ok) {
//             localStorage.removeItem('usuario');
//             window.location.href = '/login';
//         } else {
//             console.error('Error al cerrar sesión');
//         }
//     })
//     .catch(error => console.error('Error:', error));
// });