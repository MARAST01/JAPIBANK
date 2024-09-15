const fondo = document.querySelector(".fondo");
const loginlink = document.querySelector(".login-link");
const registrarlink = document.querySelector(".registrar-link");
const btn = document.querySelector(".btn");
const iconocerrar = document.querySelector(".icono-cerrar");
const olvide = document.querySelector(".olvide-link");

olvide.addEventListener("click", () => {
    window.location.href = "../olvida/olvida.html";
});
registrarlink.addEventListener("click", () => {
    fondo.classList.add('active');
});

loginlink.addEventListener("click", () => {
    fondo.classList.remove('active');
});

btn.addEventListener("click", () => {
    fondo.classList.add('active-btn');
});

iconocerrar.addEventListener("click", () => {
    fondo.classList.remove('active-btn');
}); 
// Asegúrate de que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', (event) => {
    // Selecciona el botón y los campos por su id
    const btnRegistrarse = document.getElementById('btn_r');
    const nombreInput = document.getElementById('nombre_r');
    const apellidoInput = document.getElementById('apellido_r');
    const cedulaInput = document.getElementById('cedula_r');
    const celularInput = document.getElementById('celular_r');
    const gmailInput = document.getElementById('gmail_r');
    const passwordInput = document.getElementById('password_r');
    const confirmPasswordInput = document.getElementById('confir_password_r');
    const checkbox = document.getElementById('checkbox_r');

    // Variables globales para almacenar los datos
    let nombre = '';
    let apellido = '';
    let cedula = '';
    let celular = '';
    let gmail = '';
    let password = '';
    let confirmPassword = '';
    let aceptaTerminos = false;

    // Función que se ejecuta cuando se hace clic en el botón
    btnRegistrarse.addEventListener('click', () => {
        // Prevenir el envío del formulario si es necesario
        

        // Asignar los valores de los campos a las variables globales
        nombre = nombreInput.value;
        apellido = apellidoInput.value;
        cedula = cedulaInput.value;
        celular = celularInput.value;
        gmail = gmailInput.value;
        password = passwordInput.value;
        confirmPassword = confirmPasswordInput.value;
        aceptaTerminos = checkbox.checked;

        // Puedes hacer algo con estos valores aquí
        console.log('Nombre:', nombre);
        console.log('Apellido:', apellido);
        console.log('Cédula:', cedula);
        console.log('Celular:', celular);
        console.log('Gmail:', gmail);
        console.log('Contraseña:', password);
        console.log('Confirmar Contraseña:', confirmPassword);
        console.log('Acepta términos:', aceptaTerminos);
    });
});
