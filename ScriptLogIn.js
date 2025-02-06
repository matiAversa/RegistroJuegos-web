class User{
        constructor (userName, password){
            this.userName = userName;
            this.password = password;
        }
        informacion(){
            return `usuario: ${this.userName} - contraseña: ${this.password}`;
        }
    }

    let Bvalid = document.getElementById("buttonValidacion");
    let textoUser = document.getElementById("user");
    let textoPass = document.getElementById("pass");

    let usuarioNormal = new User("matias" , "passuser");
    let usuarioAdmin = new User("matiasAdmin", "passadmin");
let usuarioFLor= new User("flor", "dejameTocarteElPapito");
    let usuarios = [usuarioNormal, usuarioAdmin, usuarioFlor];

    let botonIngresar = document.getElementById("buttonValidacion"); 
    /*botonIngresar.addEventListener("mouseover", function (){
        botonIngresar.style.padding = "10px 20px";
        botonIngresar.style.marginLeft = "48px";
    })
    botonIngresar.addEventListener("mouseout", function (){
        botonIngresar.style.padding = "7px 14px";
        botonIngresar.style.marginLeft = "45px";
    }) */

    function validacion (){

        let userIngresado = document.getElementById("user").value;
        let passIngresada = document.getElementById("pass").value;

        if ((userIngresado == usuarioNormal.userName) && (passIngresada == usuarioNormal.password)) {
                window.location.href = "opcionesUser.html";
        } else {
            if ((userIngresado == usuarioAdmin.userName) && (passIngresada == usuarioAdmin.password)) {
                window.location.href = "opcionesAdmin.html"
            } else {
                if ((userIngresado == usuarioFlor.userName) && (passIngresada == usuarioFlor.password)) {
                window.location.href = "userFlor.html"
            }else{
                Bvalid.style.background = "rgb(188, 59, 59)";
                swal ("Los datos ingresados son incorrectos, vuelva a intentarlo.")
            }
        }
    }

function mostrarUsuarios(){
    let queEs = document.getElementById("buttonUsuarios").value;
    
    if (queEs == "Mostrar Usuarios Disponibles"){

    let lista = document.getElementById('listaUsuarios');

    for (let usuario of usuarios){
        let item = document.createElement ('li');
        item.innerText= usuario.informacion();
        lista.appendChild(item);
    }
    document.getElementById("buttonUsuarios").value = "Ocultar informacion";
} else {
    document.getElementById("listaUsuarios").replaceChildren();
    document.getElementById("buttonUsuarios").value = "Mostrar Usuarios Disponibles";
}

}

    textoPass.addEventListener('input', comprobarCambioDeColor);
    textoUser.addEventListener('input', comprobarCambioDeColor);

    function comprobarCambioDeColor (event){
        if ((textoPass.value.length > 0) && (textoUser.value.length > 0)){
            Bvalid.style.background = "rgb(50, 64, 120)";
        }else{
            Bvalid.style.background = "rgb(52, 52, 52)";
        }

    }


    /*function setearReloj (){
        let tiempoActual = new Date();
        let hora = String(tiempoActual.getHours()).padStart(2,"0");
        let minuto = String (tiempoActual.getMinutes()).padStart(2,"0");
        let segundos = String(tiempoActual.getSeconds()).padStart(2,"0");
        let tiempo =  hora + ':' + minuto + ':' + segundos ;

        let elementoTextoReloj = document.getElementById("textReloj");
        elementoTextoReloj.textContent = tiempo;
    }*/
    let clock = document.getElementById("clock");
        function setearReloj() {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            clock.textContent = timeString;
        }

    

    function aviso (){
        swal("debe ingresar sus datos y luego presionar 'Ingresar'.")
    }
    function iniciarReloj(){
        //setTimeout(aviso, 10000);   //la llamada a la funcion se pone sin parentesis, ya que seino la llama instanataneamente. Sin parentesis le pasa solo la referencia
        setInterval(setearReloj, 1000);//llama a la funcion, cada vez que pase el tiempo, (seria un while true)    
    }
