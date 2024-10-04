

function validar(){
    var codigo = document.getElementById('codigo').value;
    console.log("c"+codigo);
    
    const code = localStorage.getItem('code');
    
    if(codigo == code){
        alert('Codigo correcto');
        
    }else{
        alert('Codigo incorrecto');
    }
    }
