const { error } = require('console');
const express = require('express');
const mysql = require('mysql');

const app = express();

const path = require('path');

// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'VENTANAS_LOGIN_REGISTRARSE')));
app.use(express.static(path.join(__dirname, 'VENTANA_INICIO')));
app.use(express.static(path.join(__dirname, 'VENTANA_OLVIDAR_CONTRASENA')));

let conexion = mysql.createConnection({
    host: 'localhost',
    database: "japibank",
    user: "root",
    password : ""
});

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'VENTANAS_LOGIN_REGISTRARSE', 'index.html'));
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render("index");
});


app.post('/validar', (req, res) => {
    const datos = req.body;
    let cedula = datos.cedula;
    let nombre = datos.nombre;
    let apellido = datos.apellido;
    let celular = datos.celular;
    let correo = datos.correo;
    let password = datos.contrasena;

    let buscar = "SELECT * FROM USUARIO WHERE cedula = "+cedula+"";
    
    conexion.query(buscar, (error, result) => {
        if (error) {
            throw(error);
        } else {
            if (result.length > 0) {
                res.send('<script>alert("Usuario ya registrado"); window.history.back();</script>');
            } else {
                let registrar = "INSERT INTO USUARIO (cedula, nombre, apellido, celular, correo, contrasena) VALUES (" + cedula + ", '" + nombre + "', '" + apellido + "', " + celular + ", '" + correo + "', '" + password + "')";
                let registrar_cuenta = "INSERT INTO CUENTA (cedula, monto_disponible, saldo_total) VALUES (" + cedula + ", 0.00, 0.00)";
            
    
    conexion.query(registrar, (error, result) => {
            if (error) {
                throw(error);
            } else {
                conexion.query(registrar_cuenta, (error, result) => {
                    if (error) {
                        throw(error);
                    } else {
                        res.send('<script>alert("Usuario registrado correctamente"); window.history.back();</script>');
                    }});
            }});
    }

}})});

app.get('/correos', (req, res) => {
    let buscar_correo = "SELECT correo FROM USUARIO";
    let correos = [];

    conexion.query(buscar_correo, (error, result) => {
        if (error) {
            res.status(500).send('Error en la consulta');
            throw error;
        } else {
            for (let i = 0; i < result.length; i++) {
                correos.push(result[i].correo);
            }
            res.json(correos);
        }
    });
});
                
app.post('/iniciar', (req, res) => {
    const datos1 = req.body;
    let email = datos1.email_iniciar;
    let password = datos1.password_input;

    let buscar = "SELECT * FROM USUARIO WHERE correo = '"+email+"'";
    let buscar_correcto = "SELECT * FROM USUARIO WHERE correo = '"+email+"' AND contrasena = '"+password+"'";
    let cuenta = "SELECT * FROM CUENTA WHERE cedula = (SELECT cedula FROM USUARIO WHERE correo = '"+email+"')";

    conexion.query(buscar, (error, result) => {
        if (error) {
            throw(error);
        } else {
            if (result.length > 0) {
                conexion.query(buscar_correcto, (error, result2) => {
                    if (error) {
                        throw(error);
                    } else {
                        if (result2.length > 0) {
                            conexion.query(cuenta, (error, cuenta2) => {
                                if (error) {
                                    throw(error);
                                }
                                else{
                                     res.send('<script>localStorage.setItem("cuenta", JSON.stringify('+JSON.stringify(cuenta2[0])+'));localStorage.setItem("datos", JSON.stringify(' + JSON.stringify(result2[0]) + ')); window.location.href = "ventana_inicio.html";</script>');
                                }}); 
                        } else {
                            res.send('<script>alert("Contraseña incorrecta"); window.history.back();</script>');
                        }
                    }
                });
            
            } else {
                res.send('<script>alert("Usuario no encontrado"); window.history.back();</script>');
            }
        }
    });
});


        
       

// app.post('/recuperar', (req, res) => {
//     const datos = req.body;
//     let email = datos.email_recuperar;
//     let buscar = "SELECT * FROM USUARIO WHERE correo = '"+email+"'";

    

//     const codigo_Random = Math.floor(Math.random() * 1000000);
//     console.log(codigo_Random);
    
//     conexion.query(buscar, (error, result) => {
//         if (error) {
//             throw(error);
//         } else {
//             if (result.length > 0) {
//                res.send('<script >localStorage.setItem("codigo", '+codigo_Random+');localStorage.setItem("email_code", "'+email+'");window.cambiarParaCodigo();</script>');
//             } else {
//                 res.send('<script>alert("Correo no encontrado"); window.history.back();</script>');
//             }
//         }
//     }
//     );


// }
// );


function iniciarSesion(email, res) {
    let buscar = "SELECT * FROM USUARIO WHERE correo = '" + email + "'";
    let cuenta = "SELECT * FROM CUENTA WHERE cedula = (SELECT cedula FROM USUARIO WHERE correo = '" + email + "')";

    conexion.query(buscar, (error, result) => {
        if (error) {
            throw error;
        } else {
            if (result.length > 0) {
                conexion.query(cuenta, (error, cuenta2) => {
                    if (error) {
                        throw error;
                    } else {
                        res.send('<script>localStorage.setItem("cuenta", JSON.stringify(' + JSON.stringify(cuenta2[0]) + '));localStorage.setItem("datos", JSON.stringify(' + JSON.stringify(result[0]) + ')); window.location.href = "ventana_inicio.html";</script>');
                    }
                });
            } else {
                res.send('<script>alert("Contraseña incorrecta"); window.history.back();</script>');
            }
        }
    });
}

app.post('/verificar-codigo', (req, res) => {
    const datos = req.body;
    let codigover = datos.codigo_verificacion;

    res.send('<script>const codigo = localStorage.getItem("codigo");if (codigo == ' + codigover + '){fetch("/iniciar-sesion", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({email: localStorage.getItem("email_code")})}).then(response => response.text()).then(data => document.write(data));}else{alert("Código incorrecto");window.history.back();}</script>');
});

app.post('/iniciar-sesion', (req, res) => {
    const datos = req.body;
    let email = datos.email;
    iniciarSesion(email, res);
});


    

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 http://localhost:3000');
});


