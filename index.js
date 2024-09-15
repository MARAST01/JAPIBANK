const readline = require('readline');
const { Pool } = require('pg');
const config = {
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    database: 'japibank'
};
const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
 });

const pool = new Pool(config);

const getUsuarios = () => {
    pool.query('SELECT * FROM usuarios', (error, results) => {
      if (error) {
         throw error;
      }
      console.log(results.rows);
   });
};
getUsuarios();

//insertar un usuario

const insertarUsuario = async () => {
   try {
     const cedula = await preguntar('Ingrese la cédula del usuario: ');
     const nombreusuario = await preguntar('Ingrese el nombre del usuario: ');
     const apellidousuario = await preguntar('Ingrese los apellidos del usuario: ');
     const correousuario = await preguntar('Ingrese el correo del usuario: ');
     const contrasenausuario = await preguntar('Ingrese la contraseña del usuario: ');
 
     // Consulta SQL para insertar el usuario
     const text = 'INSERT INTO usuarios(cedula, nombre, apellidos, correo, contraseña) VALUES($1, $2, $3, $4, $5)';
     const valores = [cedula, nombreusuario, apellidousuario, correousuario, contrasenausuario];
 
     // Ejecutar la consulta
     const res = await pool.query(text, valores);
     console.log('Usuario insertado con éxito:', res);
 
     // Cerrar la conexión a la base de datos y readline
     pool.end();
     rl.close();
   } catch (err) {
     console.error('Error al insertar usuario:', err);
     rl.close();
   }
 };
 
 // Función auxiliar que envuelve rl.question() en una Promesa
 const preguntar = (pregunta) => {
   return new Promise((resolve) => {
     rl.question(pregunta, (respuesta) => {
       resolve(respuesta);
     });
   });
 };
 
 // Llamar a la función para insertar el usuario
 //insertarUsuario();