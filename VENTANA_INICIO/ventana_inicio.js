// console.log(localStorage.getItem("TransaccionColchon"));
document.querySelector('.hola-name').innerHTML = "¡Hola, "+ JSON.parse(localStorage.getItem("datos")).nombre + "!";
document.querySelector('.balance').innerHTML = "$ " + JSON.parse(localStorage.getItem("cuenta")).monto_disponible;