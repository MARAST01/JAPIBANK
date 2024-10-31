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
    

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 http://localhost:3000');
});


