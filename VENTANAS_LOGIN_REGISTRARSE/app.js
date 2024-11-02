const fondo = document.querySelector(".fondo");
const loginLink = document.querySelector(".login-link");
const loginLink2 = document.querySelector(".login-link2");
const loginLink3 = document.querySelector(".login-link3");
const registrarLink = document.querySelector(".registrar-link");
const olvidarLink = document.querySelector(".olvide-link");
const btn = document.querySelector(".navegacion .btn");
const iconoCerrar = document.querySelector(".icono-cerrar");
const btnCodigo = document.querySelector("#btn_codigo");


        registrarLink.addEventListener("click", (e) => {
            e.preventDefault();
            fondo.classList.add('active-registro');
            fondo.classList.remove('active-recuperar');
            fondo.classList.remove('active-verificar');
        });

        loginLink.addEventListener("click", (e) => {
            e.preventDefault();
            fondo.classList.remove('active-registro');
            fondo.classList.remove('active-recuperar');
        });

        loginLink2.addEventListener("click", (e) => {
            e.preventDefault();
            
            fondo.classList.remove('active-recuperar');
        });

        loginLink3.addEventListener("click", (e) => {
            e.preventDefault();
            fondo.classList.remove('active-verificar');
        });

        olvidarLink.addEventListener("click", (e) => {
            e.preventDefault();
            fondo.classList.add('active-recuperar');
            fondo.classList.remove('active-registro');
            fondo.classList.remove('active-verificar');
        });

        btn.addEventListener("click", () => {
            fondo.classList.add('active-btn');
        });

        const random = Math.floor(Math.random() * 1000000);
        localStorage.setItem('codigo', random);

btnCodigo.addEventListener("click", (e) => {
    e.preventDefault();

    
    

    const email = document.querySelector('#email_recuperar').value;
    localStorage.setItem('email_code', email);

    fondo.classList.remove('active-recuperar');
    const serviceID = 'default_service';
    const templateID = 'template_hsvwna7';

    fetch('http://localhost:3000/correos')
            .then(response => response.json())
            .then(correos => {
                if (correos.includes(email)) {
   

                    emailjs.send(serviceID, templateID, {
                        message: localStorage.getItem('codigo'),
                        to_email: email
                    }).then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        console.log('El código es: ', random);
                        fondo.classList.add('active-verificar');
                    }, function(error) {
                        console.log('FAILED...', error);
                    });}
                    else{
                        alert('Correo no encontrado');
                    }
            })
            .catch(error => console.error('Error al obtener los correos:', error));
    
    
} );


  


        iconoCerrar.addEventListener("click", () => {
            fondo.classList.remove('active-registro');
            fondo.classList.remove('active-btn');
            fondo.classList.remove('active-verificar');
            fondo.classList.remove('active-recuperar');
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
