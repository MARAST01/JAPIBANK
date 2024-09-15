CREATE DATABASE JAPIBANK;

CREATE TABLE usuarios (
	cedula INT PRIMARY KEY NOT NULL UNIQUE,
	nombre VARCHAR (100) NOT NULL,
	apellidos VARCHAR (100) NOT NULL,
	correo VARCHAR(100) NOT NULL UNIQUE,
	contraseña VARCHAR(20) NOT NULL
);
insert into usuarios values
	(1111, 'Carlos','Delgado', 'carlosdelgadito@gmail.com','password');