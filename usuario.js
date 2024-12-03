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
app.use(express.static(path.join(__dirname, 'VENTANA_PERFIL')));
app.use(express.static(path.join(__dirname, 'VENTANA_META')));
app.use(express.static(path.join(__dirname, 'VENTANA_HISTORIAL')));

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
                let registrar = "INSERT INTO USUARIO (cedula, nombre, apellido, celular, correo, contrasena) VALUES (" + cedula + ", '" + nombre + "', '" + apellido + "', '" + celular + "', '" + correo + "', '" + password + "')";
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
    let meta= "SELECT * FROM META WHERE cedula = (SELECT cedula FROM USUARIO WHERE correo = '" + email + "')";
    let historialEnvia = "SELECT * FROM TRANSFERENCIA WHERE cedulaEnviador = (SELECT cedula FROM USUARIO WHERE correo = '" + email + "') ORDER BY fechaTransferencia DESC";
    let historialRecibe = "SELECT * FROM TRANSFERENCIA WHERE cedulaReceptor = (SELECT cedula FROM USUARIO WHERE correo = '" + email + "') ORDER BY fechaTransferencia DESC"; 
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
                                                        conexion.query(meta, (error, meta2) => {
                                                            if (error) {
                                                                throw error;
                                                            } else {
                                                                conexion.query(historialEnvia, (error, historialEnvia2) => {
                                                                    if (error) {
                                                                        throw error;
                                                                    } else {
                                                                        conexion.query(historialRecibe, (error, historialRecibe2) => {
                                                                            if (error) {
                                                                                throw error;
                                                                            } else {
                                                                                res.send('<script>localStorage.setItem("prestamo", JSON.stringify(' + JSON.stringify(prestamo2) + '));localStorage.setItem("cuenta", JSON.stringify(' + JSON.stringify(cuenta2[0]) + '));localStorage.setItem("datos", JSON.stringify(' + JSON.stringify(result2[0]) + '));localStorage.setItem("TransaccionColchon", JSON.stringify(' + JSON.stringify(colchon2) + '));localStorage.setItem("colchonCantidad", JSON.stringify(' + JSON.stringify(colchonCantidad2) + '));localStorage.setItem("meta", JSON.stringify(' + JSON.stringify(meta2) + '));localStorage.setItem("historialEnvia", JSON.stringify(' + JSON.stringify(historialEnvia2) + '));localStorage.setItem("historialRecibe", JSON.stringify(' + JSON.stringify(historialRecibe2) + ')); localStorage.setItem("usuario", JSON.stringify(' + JSON.stringify(result2[0]) + ')); window.location.href = "ventana_inicio.html";</script>');
                                                                            }
                                                                        }
                                                                        );
                                                                    }
                                                                }
                                                                );
                                                            }
                                                        }
                                                        );
                                                    }
                                                }
                                                );
                                            }
                                        }
                                        );
                                    }
                                } );
                            }   
                        }); }
                    else {
                        res.send('<script>alert("Contraseña incorrecta"); window.history.back();</script>');
                    }
                }
            }
            );
        } else {
            res.send('<script>alert("Correo no encontrado"); window.history.back();</script>');
        }
    }
}
);
}
);
                    
app.post('/editar_perfil', (req, res) => {
    if(confirm("¿Está seguro que desea editar su perfil?")){
    const datos = req.body;
    let cedula = datos.cedula;
    let email = datos.correo;
    let nombre = datos.nombre;
    let apellido = datos.apellido;
    let telefono = datos.telefono;

    let actualizar = "UPDATE USUARIO SET correo = '" + email + "', nombre = '" + nombre + "', apellido = '" + apellido + "', celular = '" + telefono + "' WHERE cedula = " + cedula;
    let actualizarUsuario = "SELECT * FROM USUARIO WHERE cedula = " + cedula;
    conexion.query(actualizar, (error, result) => {
        if (error) {
            throw error;
        } else {
            conexion.query(actualizarUsuario, (error, usuario2) => {
                if (error) {
                    throw error;
                } else {
                    res.send('<script>localStorage.setItem("usuario", JSON.stringify(' + JSON.stringify(usuario2[0]) + '));alert("Perfil actualizado correctamente"); window.location.href = "perfil.html";</script>');
                }
            });
        }
    });
}

});

app.post('/actualizar_contra', (req, res) => {

    const datos = req.body;
    let email = datos.correo_act;
    let password = datos.act_contraseña;
    let confirm = datos.act_contraseña2;

    if (password == confirm) {
        let actualizar = "UPDATE USUARIO SET contrasena = '" + password + "' WHERE correo = '" + email + "'";
        conexion.query(actualizar, (error, result) => {
            if (error) {
                throw error;
            } else {
                res.send('<script>alert("Contraseña actualizada correctamente"); window.history.back();</script>');
                
            }
        });
    } else{
        res.send('<script>alert("Las contraseñas no coinciden"); window.history.back();</script>');
    }
});

app.post("/solicitarPrestamo", (req, res) => {
    const datos = req.body;
    let monto = datos.monto;
    let meses = datos.plazo;
    let interes = datos.interes;
    let cedula = datos.cedula;

    

    
    let totalAPagar = monto * Math.pow((1 + interes / 100), meses);

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

    let cedulaRec = "SELECT cedula FROM USUARIO WHERE celular = '" + telefonoRec+"'";
    

    conexion.query(cedulaRec, (error, cedulaRec2) => {
        if (error) {
            throw error;
        } else {
        let transferencia = "INSERT INTO TRANSFERENCIA (cedulaEnviador, cedulaReceptor, cantidad, mensaje) VALUES (" + cedulaEn + ", " + cedulaRec2[0].cedula + ", " + cantidad + ", '" + mensaje + "')";
        let actualizarCuentaEnviador = "UPDATE CUENTA SET monto_disponible = monto_disponible - " + cantidad + " WHERE cedula = " + cedulaEn;
        let actualizarCuentaReceptor = "UPDATE CUENTA SET monto_disponible = monto_disponible + " + cantidad + " WHERE cedula = " + cedulaRec2[0].cedula;
        let historialEnvia = "SELECT * FROM TRANSFERENCIA WHERE cedulaEnviador = (SELECT cedula FROM USUARIO WHERE cedula = '" + cedulaEn + "') ORDER BY fechaTransferencia DESC";
        let historialRecibe = "SELECT * FROM TRANSFERENCIA WHERE cedulaReceptor = (SELECT cedula FROM USUARIO WHERE cedula = '" + cedulaEn + "') ORDER BY fechaTransferencia DESC"; 
    
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
                                conexion.query(historialEnvia, (error, historialEnvia2) => {
                                    if (error) {
                                        throw error;
                                    } else {
                                        conexion.query(historialRecibe, (error, historialRecibe2) => {
                                            if (error) {
                                                throw error;
                                            } else {
                                                res.send('<script>alert("Transferencia realizada correctamente"); localStorage.setItem("historialEnvia", JSON.stringify(' + JSON.stringify(historialEnvia2) + '));localStorage.setItem("historialRecibe", JSON.stringify(' + JSON.stringify(historialRecibe2) + ')); window.location.href = "ventana_transferencia.html";</script>');
                                                  
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

});

app.post('/crear_meta', (req, res) => {
    const datos = req.body;
    let cedula = datos.cedula;
    let meta = datos.nombreMeta;
    let fecha = datos.fecha;

    let insertar = "INSERT INTO META (cedula, meta, fecha) VALUES (" + cedula + ", '" + meta + "', '" + fecha + "')";
    let meta2 = "SELECT * FROM META WHERE cedula = " + cedula;
    conexion.query(insertar, (error, result) => {
        if (error) {
            throw error;
        } else {
            conexion.query(meta2, (error, meta3) => {
                if (error) {
                    throw error;
                } else {
                    res.send('<script>localStorage.setItem("meta", JSON.stringify(' + JSON.stringify(meta3) + '));alert("Meta creada correctamente"); window.location.href = "meta.html";</script>');
                }
            });
        }
    });
} );

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


