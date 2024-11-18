const { error } = require('console');
const express = require('express');
const mysql = require('mysql');

const app = express();

const path = require('path');

// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'VENTANAS_LOGIN_REGISTRARSE')));
app.use(express.static(path.join(__dirname, 'VENTANA_INICIO')));
app.use(express.static(path.join(__dirname, 'VENTANA_OLVIDAR_CONTRASENA')));
app.use(express.static(path.join(__dirname, 'VENTANA_COLCHON')));
app.use(express.static(path.join(__dirname, 'VENTANA_PRESTAMO')));
app.use(express.static(path.join(__dirname, 'VENTANA_TUPLATA')));
app.use(express.static(path.join(__dirname, 'VENTANA_TRANSFERENCIA')));

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
                let colchon = "INSERT INTO COLCHON (cedula, cantidad) VALUES (" + cedula + ", 0.00)";
            
    
    conexion.query(registrar, (error, result) => {
            if (error) {
                throw(error);
            } else {
                conexion.query(registrar_cuenta, (error, result) => {
                    if (error) {
                        throw(error);
                    } else {
                        conexion.query(colchon, (error, result) => {
                            if (error) {
                                throw(error);
                            } else {
                                res.send('<script>alert("Usuario registrado correctamente"); window.history.back();</script>');
                            }
                        });
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
    let prestamo = "SELECT * FROM PRESTAMO WHERE cedula = (SELECT cedula FROM USUARIO WHERE correo = '" + email + "')";
    let colchon = "SELECT * FROM TRANSACCION_COLCHON WHERE cedula = (SELECT cedula FROM USUARIO WHERE correo = '" + email + "')";
    let colchonCantidad = "SELECT cantidad FROM COLCHON WHERE cedula = (SELECT cedula FROM USUARIO WHERE correo = '" + email + "')";
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
                                    conexion.query(prestamo,  (error, prestamo2) => {
                                        if (error) {
                                            throw error;
                                        } else {
                                            conexion.query(colchon, (error, colchon2) => {
                                                if (error) {
                                                    throw error;
                                                } else {
                                                  conexion.query(colchonCantidad, (error, colchonCantidad2) => {
                                                    if (error) {
                                                        throw error;
                                                    } else {
                                                        res.send('<script>localStorage.setItem("prestamo", JSON.stringify(' + JSON.stringify(prestamo2) + '));localStorage.setItem("cuenta", JSON.stringify(' + JSON.stringify(cuenta2[0]) + '));localStorage.setItem("datos", JSON.stringify(' + JSON.stringify(result2[0]) + '));localStorage.setItem("TransaccionColchon", JSON.stringify(' + JSON.stringify(colchon2) + '));localStorage.setItem("colchonCantidad", JSON.stringify(' + JSON.stringify(colchonCantidad2) + ')); window.location.href = "ventana_inicio.html";</script>');
                                                    } 
                                                } ); }
                                            });
                                        }});
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
    let prestamo = "SELECT * FROM PRESTAMO WHERE cedula = (SELECT cedula FROM USUARIO WHERE correo = '" + email + "')";
    let colchon = "SELECT * FROM TRANSACCION_COLCHON WHERE cedula = (SELECT cedula FROM USUARIO WHERE correo = '" + email + "')";
    let colchonCantidad = "SELECT cantidad FROM COLCHON WHERE cedula = (SELECT cedula FROM USUARIO WHERE correo = '" + email + "')";
    conexion.query(buscar, (error, result) => {
        if (error) {
            throw error;
        } else {
            if (result.length > 0) {
                conexion.query(prestamo,  (error, prestamo2) => {
                    if (error) {
                        throw error;
                    } else {
                        conexion.query(cuenta, (error, cuenta2) => {
                            if (error) {
                                throw error;
                            } else {
                               conexion.query(colchon, (error, colchon2) => {
                                      if (error) {
                                        throw error;
                                      } else {
                                        conexion.query(colchonCantidad, (error, colchonCantidad2) => {
                                            if (error) {
                                                throw error;
                                            } else {
                                                res.send('<script>localStorage.setItem("prestamo", JSON.stringify(' + JSON.stringify(prestamo2) + '));localStorage.setItem("cuenta", JSON.stringify(' + JSON.stringify(cuenta2[0]) + '));localStorage.setItem("datos", JSON.stringify(' + JSON.stringify(result[0]) + '));localStorage.setItem("TransaccionColchon", JSON.stringify(' + JSON.stringify(colchon2) + '));localStorage.setItem("colchonCantidad", JSON.stringify(' + JSON.stringify(colchonCantidad2[0]) + ')); window.location.href = "ventana_inicio.html";</script>');
                                            }
                                        });
                                      }
                                 });
                            } 
                    } );
                }});
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

app.post("/solicitarPrestamo", (req, res) => {
    const datos = req.body;
    let monto = datos.monto;
    let meses = datos.plazo;
    let interes = datos.interes;
    let cedula = datos.cedula;

    

    let totalAPagar = monto * (1 + interes / 100);

    let insertar = "INSERT INTO PRESTAMO (cedula, monto, plazo, interes, totalApagar) VALUES (" + cedula + ", " + parseFloat(monto) + ", " + meses + ", " + parseFloat(interes) + ", " + parseFloat(totalAPagar) + ")";
    let insertarCuenta = "UPDATE CUENTA SET monto_disponible = monto_disponible + " + parseFloat(monto) + " WHERE cedula = " + cedula;
    let actualizarCuenta = "SELECT * FROM CUENTA WHERE cedula = " + cedula;
    let prestamo = "SELECT * FROM PRESTAMO WHERE cedula = " + cedula;
    conexion.query(insertar, (error, result) => {
        if (error) {
            throw error;
        } else {
            conexion.query(insertarCuenta, (error, result) => {
                if (error) {
                    throw error;
                } else {
                    conexion.query(actualizarCuenta, (error, cuenta2) => {
                        if (error) {
                            throw error;
                        } else {

            conexion.query(prestamo, (error, prestamo2) => {
                if (error) {
                    throw error;
                } else {
                    res.send('<script> localStorage.setItem("cuenta", JSON.stringify(' + JSON.stringify(cuenta2[0]) + '));localStorage.setItem("prestamo", JSON.stringify(' + JSON.stringify(prestamo2) + '));alert("Préstamo solicitado correctamente"); window.location.href = "prestamo.html";</script>');

                }
            }
            );} 
        }  );
    }
});
}});
});
 




app.post('/transferencia', (req, res) => {
    const datos = req.body;
    let cedulaEn = datos.cedulaEn;
    let cantidad = datos.cantidadTransferencia;
    let telefonoRec = datos.telefonoRec;
    let mensaje = datos.mensajeTransferencia;

    let cedulaRec = "SELECT cedula FROM USUARIO WHERE celular = " + telefonoRec;
    

    conexion.query(cedulaRec, (error, cedulaRec2) => {
        if (error) {
            throw error;
        } else {
        let transferencia = "INSERT INTO TRANSFERENCIA (cedulaEnviador, cedulaReceptor, cantidad, mensaje) VALUES (" + cedulaEn + ", " + cedulaRec2[0].cedula + ", " + cantidad + ", '" + mensaje + "')";
        let actualizarCuentaEnviador = "UPDATE CUENTA SET monto_disponible = monto_disponible - " + cantidad + " WHERE cedula = " + cedulaEn;
        let actualizarCuentaReceptor = "UPDATE CUENTA SET monto_disponible = monto_disponible + " + cantidad + " WHERE cedula = " + cedulaRec2[0].cedula;
        
        conexion.query(transferencia, (error, result) => {
            if (error) {
                throw error;
            } else {
                conexion.query(actualizarCuentaEnviador, (error, result) => {
                    if (error) {
                        throw error;
                    } else {
                        conexion.query(actualizarCuentaReceptor, (error, result) => {
                            if (error) {
                                throw error;
                            } else {
                                res.send('<script>alert("Transferencia realizada correctamente"); window.location.href = "colchon.html";</script>');
                            }
                        });
                    }
                });
            }
        });
        }
    });

});

app.post("/colchon", (req, res) => {
    const datos = req.body;
    let cedula = datos.cedula;
    let cantidad = datos.cantidad;
    const accion = datos.accion;

    let insertar = "UPDATE COLCHON SET cantidad = cantidad + " + cantidad + " WHERE cedula = " + cedula;
    let insertarTransaccionColchon = "INSERT INTO TRANSACCION_COLCHON (cedula,tipo, cantidad) VALUES (" + cedula + ", 'Depositar', " + cantidad + ")";
    let sacar = "UPDATE COLCHON SET cantidad = cantidad - " + cantidad + " WHERE cedula = " + cedula;

    let actualizarCuentaIn = "UPDATE CUENTA SET monto_disponible = monto_disponible - " + cantidad + " WHERE cedula = " + cedula;
    let sacarTransaccionColchon = "INSERT INTO TRANSACCION_COLCHON (cedula,tipo, cantidad) VALUES (" + cedula + ", 'Retirar', " + cantidad + ")";
    let actualizarCuentaOut = "UPDATE CUENTA SET monto_disponible = monto_disponible + " + cantidad + " WHERE cedula = " + cedula;
    let cuentaAtualizada = "SELECT * FROM CUENTA WHERE cedula = " + cedula;
    let colchonAtualizado = "SELECT * FROM TRANSACCION_COLCHON WHERE cedula = " + cedula;
    let colchonCantidad = "SELECT cantidad FROM COLCHON WHERE cedula = " + cedula;
    if(accion == "depositarColchon"){
        conexion.query(insertar, (error, result) => {
            if (error) {
                throw error;
            } else {
                conexion.query(actualizarCuentaIn, (error, result) => {
                    if (error) {
                        throw error;
                    } else {
                        conexion.query(insertarTransaccionColchon, (error, result) => {
                            if (error) {
                                throw error;
                            } else {
                               conexion.query(cuentaAtualizada, (error, cuenta2) => {
                                    if (error) {
                                        throw error;
                                    } else {
                                        conexion.query(colchonAtualizado, (error, colchon2) => {
                                            if (error) {
                                                throw error;
                                            } else {
                                               conexion.query(colchonCantidad, (error, colchonCantidad2) => {
                                                    if (error) {
                                                        throw error;
                                                    } else {
                                                        res.send('<script>localStorage.setItem("cuenta", JSON.stringify(' + JSON.stringify(cuenta2[0]) + '));localStorage.setItem("TransaccionColchon", JSON.stringify(' + JSON.stringify(colchon2) + '));localStorage.setItem("colchonCantidad", JSON.stringify(' + JSON.stringify(colchonCantidad2) + '));alert("Colchón depositado correctamente");   window.location.href = "colchon.html";</script>');
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } else if (accion == "retirarColchon"){
        conexion.query(sacar, (error, result) => {
            if (error) {
                throw error;
            } else {
                conexion.query(actualizarCuentaOut, (error, result) => {
                    if (error) {
                        throw error;
                    } else {
                        conexion.query(sacarTransaccionColchon, (error, result) => {
                            if (error) {
                                throw error;
                            } else {
                               conexion.query(cuentaAtualizada, (error, cuenta2) => {
                                    if (error) {
                                        throw error;
                                    } else {
                                        conexion.query(colchonAtualizado, (error, colchon2) => {
                                            if (error) {
                                                throw error;
                                            } else {
                                                conexion.query(colchonCantidad, (error, colchonCantidad2) => {
                                                    if (error) {
                                                        throw error;
                                                    } else {
                                                        res.send('<script>localStorage.setItem("cuenta", JSON.stringify(' + JSON.stringify(cuenta2[0]) + '));localStorage.setItem("TransaccionColchon", JSON.stringify(' + JSON.stringify(colchon2) + '));localStorage.setItem("colchonCantidad", JSON.stringify(' + JSON.stringify(colchonCantidad2) + '));alert("Colchón retirado correctamente"); window.location.href = "colchon.html";</script>');
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
} );

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 http://localhost:3000');
});


