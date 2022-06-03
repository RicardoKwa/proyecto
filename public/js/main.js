
// #region swiper-slide Event

function getCityNameByIndice(indice){
    let cityName

    switch (indice) {
        case 0:
            cityName = "Madrid";
          break;
        case 1:
            cityName = "Barcelona";
          break;
        case 2:
            cityName = "Valencia";
          break;
        case 3:
            cityName = "Sevilla";
          break;
        case 4:
            cityName = "Bilbao";
          break;
        case 5:
            cityName = "Mallorca";
    }

    return cityName
}

function asignarEvento(collection,callback,subcallback) {
    for (let i = 0; i < collection.length; i++) {
        collection[i].addEventListener("click", callback(subcallback(i)))    
    }
}

function printDivPisos(piso){
   
    let div = document.createElement("div");
    div.setAttribute("class", "divPisos");

    let idHide = document.createElement("p")
    idHide.innerHTML = piso.id
    idHide.hidden = true
    
    let h1 = document.createElement("h1")
    h1.innerHTML = "Piso en " + piso.direccion;

    let imagen = image("images/proyecto/pisos/MADRID/JacintoBenavente.jpg")
    imagen.setAttribute('class','foto')

    div.append(idHide)
    div.appendChild(imagen)
    div.appendChild(h1)
    div.appendChild(getList(piso))
    div.addEventListener("click", printPiso2(piso))

    document.getElementById("zonaPisos").append(div)

}

function image(ruta){
    let img = document.createElement('img');
    img.src = ruta
    return img
}

function p(text){
    let p = document.createElement('p');
    p.innerHTML = text
    return p
}

function getList(piso){
    const ul = document.createElement("ul")
    for (let i = 0; i < 4; i++) {        
        ul.appendChild(setDataList(i,piso))
    }
    return ul
}

function auxDataList(li,iClass,text){

    icon = document.createElement("i")
    icon.setAttribute('class',iClass)
    li.append(icon, p(text))
}

function setDataList(indice,piso){
    
    let li = document.createElement("li")
    let icon
    
    switch (indice) {
        case 0:
            auxDataList(li,"fas fa-door-open","Habitaciones " + piso.idCar.numHab)
          break;
        case 1:
            auxDataList(li,"fas fa-bath","Baños " + piso.idCar.numBanos)
          break;
        case 2:
            auxDataList(li,"fas fa-euro-sign","Precio " + piso.precioMes + "/Mes")
          break;
        case 3:
            auxDataList(li,"fas fa-wallet","Fianza " + piso.fianza)
    }

    return li
}

// #endregion

// #region form

function setLoginForm(){

  let bodyElements = document.body.children

  bodyElements[2].style.display = "none";//fondo
  bodyElements[4].style.display = "flex";//form
  bodyElements[5].style.display = "none";//swiper
  bodyElements[6].style.display = "none";//zonaInfo
  bodyElements[7].innerHTML='';//zonaPisos
  // bodyElements[8].style.display = "none"; // formReserva
    
    // document.getElementById("form").style.display = "flex";
    // document.getElementById("fondo").style.display = "none";
    // document.getElementById("swiper-wrap").style.display = "none";
    // document.getElementById("zonaInfo").style.display = "none";
    // zonaPisos.innerHTML = ""
    document.getElementById("SubmitL").addEventListener("click",login);
    document.getElementById("SubmitR").addEventListener("click",register);
}

// #endregion

// #region fetch

function getPisos(cityName){
    
    return function(){
        
        let url = new URL("http://localhost:8000/pisos?ciudad=param-city");
        url = url.toString().replace("param-city", cityName) //Hay que pasarlos a string previamente
        
        // let zonaPisos = document.getElementById("zonaPisos"); //Esta línea no es necesaria , pero es por Info

        fetch(url)
            .then(function (respuesta) {
                return respuesta.json()
            }).then(function (pisos) {
                console.log(pisos)
                document.getElementById("fondo").style.display = "none";
                document.getElementById("swiper-wrap").style.display = "none";
                zonaPisos.style.display = "flex";
                zonaPisos.innerHTML = ""
                pisos.forEach(printDivPisos)
            })

    }
}

function register() {
    event.preventDefault()
    let nombre = document.forms.form['Name'].value
    let p_apellido = document.forms.form['FSurname'].value
    let s_apellido = document.forms.form['SSurname'].value
    let email = document.forms.form['EmailR'].value
    let pass = document.forms.form['Rpassword'].value

    let data = {
        nombre: nombre,
        papellido: p_apellido,
        sapellido: s_apellido,
        email: email,
        password: pass
    }

    if (nombre != "" && p_apellido != "" && s_apellido != "" && email != "" && pass != "") {
                if (pass == document.forms.form['Password'].value) {
                    fetch("http://localhost:8000/prueba", {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (respuesta) {
                        return respuesta.text()
                    }).then(function (text) {
                       console.log(text)
                    })

                } else {
                    alert("Las contraseñas no coinciden")
                }
    } else {
        alert("Campos requeridos sin rellenar")
    }
}

//#endregion

// #region login

function login() {
    event.preventDefault()
    let email = document.forms.form['Email-log'].value
    let pass = document.forms.form['Password-log'].value

    let data = {
        email: email,
        password: pass
    }

    if (email != "" && pass != "") {                                      //Falta validar email
                    fetch("http://localhost:8000/login", {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (respuesta) {
                        return respuesta.text()
                    }).then(function (text) {
                        if(text == "PasswordError"){
                            // alert("Contraseña Incorrecta")
                            Alert.error('Contraseña incorrecta ','Login Error',{displayDuration: 4000})
                        }  
                        else if(text == "UserError"){
                            Alert.error('El Usuario : ' + text + ' no existe','Login Error',{displayDuration: 4000})
                        }
                        else if(text == 'ADMIN'){
                            Alert.success('Se ha logeado como Administrador','ADMINISTRADOR',{displayDuration: 6000, pos: 'top'})
                            adminLog()
                        }else{
                          Alert.success('Login Success! Usuario : ' +  text,'Login',{displayDuration: 6000, pos: 'top'})
                          okLog()
                        }  
                    })

    } else {
        //alert("Campos requeridos sin rellenar")
        Alert.warning('Campos requeridos sin rellenar ','Error',{displayDuration: 3000})
        //Alert.success('Success! This alert box indicates a successful or positive action. ','Success',{displayDuration: 3000, pos: 'top'})
    }
}


function okLog(){
    
    let menu = document.getElementById('menu')
    menu.children[3].style.display = "block"
    menu.children[3].addEventListener("click",getReservas)

    let bodyElements = document.body.children

    bodyElements[2].style.display = "flex";//fondo
    bodyElements[4].style.display = "none";//form
    bodyElements[5].style.display = "block";//swiper
    // bodyElements[6].style.display = "none";//zonaInfo
    bodyElements[7].innerHTML='';//zonaPisos
    bodyElements[8].style.display = "none"; // formReserva

    
    document.getElementById('btForm').style.display = 'none'
    document.getElementById('btExit').style.display = 'flex'   //INTENTAR CAMBIAR LOS GETID POR OTRA COSA
//     document.getElementById('form').style.display = 'none'
//     document.getElementById('fondo').style.display = 'flex'
//     document.getElementById('swiper-wrap').style.display = 'block'
//     document.getElementById('formReserva').style.display = 'none'
 }


 function adminLog(){
    
  let menu_admin = document.getElementById('menu-admin')
  menu_admin.style.display = "inline-block"
  menu_admin.children[1].children[0].addEventListener("click",getClientesAdmin)
  menu_admin.children[1].children[1].addEventListener("click",getReservasAdmin)
  menu_admin.children[1].children[2].addEventListener("click",getPisosAdmin)
  

  let bodyElements = document.body.children

  bodyElements[2].style.display = "flex";//fondo
  bodyElements[4].style.display = "none";//form
  bodyElements[5].style.display = "block";//swiper
  // bodyElements[6].style.display = "none";//zonaInfo
  bodyElements[7].innerHTML='';//zonaPisos
  bodyElements[8].style.display = "none"; // formReserva

  
  document.getElementById('btForm').style.display = 'none'
  document.getElementById('btExit').style.display = 'flex'   //INTENTAR CAMBIAR LOS GETID POR OTRA COSA
}



//#endregion

// #region Load

window.addEventListener("load", function init() {
        
    const collection = document.getElementsByClassName("swiper-slide");
    asignarEvento(collection,getPisos,getCityNameByIndice);

    document.getElementById("btForm").addEventListener("click",setLoginForm);
    document.getElementById("btExit").addEventListener("click",logout);
    document.getElementById("busca").addEventListener("click",getPisosFiltro)
    document.getElementById('menu').children[1].onclick = home
    
    inicializarInputDate()
})

// #endregion
function inicializarInputDate(){
  let dateIni = document.getElementById('dateIni')
  let dateFin = document.getElementById('dateFin')
  
  dateIni.type = 'text';
  dateFin.type = 'text';
  dateIni.value = '';
  dateFin.value='';

  goToStep(1)
  checkDisponible.style.display = "block";
  previousButton.style.display = "none";
  nextButton.style.display = "none";

  dateIni.onfocus = (() => dateIni.type= 'date') 

  dateFin.onfocus = (() => dateFin.type= 'date') 

}

function cleanDataForms(){ //Si generamos algun form dinamicamente, no haría falta, para ese formulario
  
  const inputs = document.querySelectorAll('input');
  
  
  for(let i = 0 ; i < inputs.length ; ++i){
    inputs[i].value = '';
 }
  
}

function imageSwip(i){
   let src
    switch (i) {
        case 0:
            src= "images/proyecto/pisos/MADRID/CHALET LASROZAS/ROZAS1.png"
          break;
        case 1:
            src= "images/proyecto/pisos/MADRID/CHALET LASROZAS/ROZAS2.png"
          break;
        case 2:
            src= "images/proyecto/pisos/MADRID/CHALET LASROZAS/ROZAS3.png"
    }
    return src
}




function printPiso2(piso){
    return function(){
        //let info = document.getElementById("info")
        let zonaInfo = document.getElementById("zonaInfo")

        document.getElementById("zonaPisos").innerHTML=""
        let array = document.getElementsByClassName("prueba")
        auxPrintPiso2(array)
        //info.style.display="flex";
        zonaInfo.style.display="flex";
        if(limpiarDiv(zonaInfo.children[0].children[3])){
          zonaInfo.children[0].children[3].append(showPisoData(piso),
          caracteristicas(piso.idCar,auxCar),caracteristicas(piso.idReg,auxReg));
          
          if(zonaInfo.children[0].children[3].appendChild(mapa())) initialize() 
          
          
          zonaInfo.children[1].append(buttonReserva(piso));
          console.log(piso)
        }     
    }
}

function showPisoData(piso){
    let h1 = document.createElement("h1")
    h1.innerHTML = "Piso en " + piso.direccion;
    let div = document.createElement("div");
    div.append(h1,getList(piso))
    div.setAttribute("class","infoDiv")
    return div

}

function caracteristicas(obj,callback){
    let div = document.createElement("div");
    let ul = document.createElement("ul");
    for (atr in obj) {

        let li = callback(atr,obj)

        if(li.innerHTML != "")  ul.append(li)
        //   if(li.innerHTML != "")
      }
    div.append(ul)
    div.setAttribute('class','infoDiv')
    return div
}

function auxCar(atr,obj){

    let li = document.createElement("li")   
    switch (atr) {        
        case "television":
            if(obj[atr]) li.append(newIcon("fas fa-tv"),atr)      ////////Fijarse en esta fila
          break;
        case "amueblado":
            li.append(newIcon("fas fa-couch"),atr) 
        break;
        case "llaveDormitorio":
            li.append(newIcon("fas fa-key"),atr) 
        break;
        case "calefaccion":
            li.append(newIcon("fas fa-temperature-high"),atr) 
        break;
        case "balcon":
            li.append(newIcon("fas fa-tree"),atr) 
        break;
        case "ascensor":
            li.append(newIcon("fas fa-arrow-up"),atr) 
        break;        
        case "aireAcond":
            li.append(newIcon("fas fa-fan"),atr) 
        break;
        case "garaje":
            li.append(newIcon("fas fa-warehouse"),atr) 
        break;
        case "lavadora":
            li.append(newIcon("fas fa-soap"),atr) 
        break;
        case "internet":
            li.append(newIcon("fas fa-wifi"),atr) 
        break;
        case "playa":
            li.append(newIcon("fas fa-umbrella-beach"),atr) 
        break;
        case "cocinaEquipada":
            li.append(newIcon("fas fa-sink"),atr) 
        break;
        case "luminoso":
            li.append(newIcon("fas fa-lightbulb"),atr) 
        break;
    }

    return li
}

function auxPrintPiso2(array){
    // let img = document.createElement('img');
    // img.src = "images/proyecto/pisos/MADRID/CHALET LASROZAS/ROZAS3.png"
    for (let i = 0; i < array.length; i++) {
        let img = document.createElement('img');
        img.src = imageSwip(i)
        array[i].innerHTML=""  
        array[i].append(img)
    }
}

function newIcon(text){
    let div =  document.createElement('div');
    let icon = document.createElement('i');
    icon.setAttribute('class',text);
    div.append(icon);
    return div
}



//#region Reglas

function auxReg(atr,obj){

    let li = document.createElement("li")   
    switch (atr) {        
        case "parejas":
            if(!obj[atr]) li.append(newIcon("fas fa-heart"),atr)      ////////Fijarse en esta fila
          break;
        case "mascotas":
            li.append(newIcon("fas fa-dog"),atr) 
        break;
        case "fiestas":
            li.append(newIcon("fas fa-gift"),atr) 
        break;
        case "fumar":
            li.append(newIcon("fas fa-smoking"),atr) 
    }

    return li
}


//#endregion


//#region Mapa

function mapa(){
    let div =  document.createElement('div');
    div.setAttribute('id',"map");
    return div;
}


// Función para inicializar el mapa
function initialize()
{
let myCenter=new google.maps.LatLng(40.416775,-3.703790);
let map_ubi = {
  //Muestra las coordenadas al centro del mapa
  center:myCenter,
  //Zoom del mapa 
  zoom:10,
  //Tipo de mapa: ROADMAP, SATELLITE, HYBRID, TERRAIN 
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };

//Creamos un mapa en el contenedor con id map,  usando los parámetros de la variable mapa
let map=new google.maps.Map(document.getElementById("map"),map_ubi);

// Mostramos el marcador en las coordenadas almacenada en la variable myCenter
let marker=new google.maps.Marker({
  position:myCenter,
  });

// Añadimos el marcador para el mapa utilizando el método setMap()
marker.setMap(map);
}

//#endregion


//#region Button Reserva

function buttonReserva(piso){
    let div =  document.createElement('div');
    let sub = document.createElement('div');
    sub.innerHTML = piso.fianza + '€'
    sub.setAttribute('id','pagoReserva')
    // div.setAttribute("id","divReservar")
    let bt = document.createElement('button');
    bt.setAttribute("id","btReservar")
    bt.innerHTML = "Reservar"
    bt.addEventListener("click",checkSession(piso))
    div.append(sub,bt);
    return div;
}

//#endregion




















const checkDisponible = document.getElementById("btDisponible")
const previousButton = document.getElementById("previous")
const nextButton = document.getElementById("next")
const submitButton = document.getElementById('validate')
const form = document.getElementById('stepByStepForm')
const dots = document.getElementsByClassName('progress-bar__dot')
const numberOfSteps = 3
let currentStep = 1

for(let i = 0 ; i < dots.length ; ++i){
   dots[i].addEventListener('click', ()=>{
     goToStep(i+1) 
   })
}

previousButton.onclick = goPrevious
nextButton.onclick = goNext


function goNext(e) {
   e.preventDefault()
   currentStep += 1
   goToStep(currentStep)
}

function goPrevious(e) {
   e.preventDefault()
   currentStep -= 1
   goToStep(currentStep)
}

function goToStep(stepNumber){   
   currentStep = stepNumber
   
   let inputsToHide = document.getElementsByClassName('step')
   let inputs = document.getElementsByClassName(`step${currentStep}`)
   let indicators = document.getElementsByClassName('progress-bar__dot')
   
   for(let i = indicators.length-1; i >= currentStep ; --i){
      indicators[i].classList.remove('full')
   }
   
   for(let i = 0; i < currentStep; ++i){
      indicators[i].classList.add('full')
   }
   
   //hide all input
   for (let i = 0; i < inputsToHide.length; ++i) {
      hide(inputsToHide[i])
   }
   
   //only show the right one
   for (let i = 0; i < inputs.length; ++i) {
      show(inputs[i])
   }
   
   //if we reached final step
   if(currentStep === numberOfSteps){
      enable(previousButton)
      disable(nextButton)
      show(submitButton)
   }
   
   //else if first step
   else if(currentStep === 1){
     disable(previousButton)
      enable(next)
      hide(submitButton)
   }
   
   else {
      enable(previousButton)
      enable(next)
      hide(submitButton)
   }
}

function enable(elem) {
   elem.classList.remove("disabled");
   elem.disabled = false;
}

function disable(elem) {
   elem.classList.add("disabled");
   elem.disabled = true;
}

function show(elem){
   elem.classList.remove('hidden')
}

function hide(elem){
   elem.classList.add('hidden')
}

  ///////////////////////////////////////////////////////////////////////

function doFormat(x, pattern, mask) {
    var strippedValue = x.replace(/[^0-9]/g, "");
    var chars = strippedValue.split('');
    var count = 0;
  
    var formatted = '';
    for (var i=0; i<pattern.length; i++) {
      const c = pattern[i];
      if (chars[count]) {
        if (/\*/.test(c)) {
          formatted += chars[count];
          count++;
        } else {
          formatted += c;
        }
      } else if (mask) {
        if (mask.split('')[i])
          formatted += mask.split('')[i];
      }
    }
    return formatted;
  }

  function format(elem) {
    const val = doFormat(elem.value, elem.getAttribute('data-format'));
    elem.value = doFormat(elem.value, elem.getAttribute('data-format'), elem.getAttribute('data-mask'));
    
    if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.move('character', val.length);
      range.select();
    } else if (elem.selectionStart) {
      elem.focus();
      elem.setSelectionRange(val.length, val.length);
    }
  }
  
  document.querySelectorAll('[data-mask]').forEach(function(e) {
    
    e.addEventListener('keyup', function() {
      format(e);
    });
    e.addEventListener('keydown', function() {
      format(e);
    });
    format(e)
  });

  ///////////////////////////////////////////////////////////////////////
function limpiarDiv(div){
  div.innerHTML = ""
  return true
}

function showReserva(piso){

    // return function(){
            

        let reserva = document.getElementById("formReserva")
        reserva.style.display= "flex"
        document.getElementById("zonaInfo").style.display= "none"
        let div = document.getElementById("res-right")
        // div.innerHTML = ""
        if(limpiarDiv(div)){
          let imagen = image("images/proyecto/pisos/MADRID/JacintoBenavente.jpg")
          imagen.setAttribute("id","imgForm")
          console.log(piso.idEst)
          div.append(imagen,showPisoData(piso))
          reserva.append(div)
          checkDisponible.onclick = comprobarDisponible(piso)
          submitButton.addEventListener("click",reservar(piso))
        }
    // }
    
}

function logout(){
    let url = new URL("http://localhost:8000/logout");
        
    // let zonaPisos = document.getElementById("zonaPisos"); //Esta línea no es necesaria , pero es por Info

    fetch(url)
        .then(function (respuesta) {
            return respuesta.text()
        }).then(function (text) {
            
            document.getElementById('btForm').style.display = 'flex'
            document.getElementById('btExit').style.display = 'none'
            document.getElementById('menu').children[3].style.display = "none"
            home()
            
            Alert.success('Sesión cerrada con éxito','Sesión Cerrada',{displayDuration: 6000, pos: 'top'})
        })


}

function checkSession(piso){
    
    return function(){
        
        let url = new URL("http://localhost:8000/check");
        
        // let zonaPisos = document.getElementById("zonaPisos"); //Esta línea no es necesaria , pero es por Info

        fetch(url)
            .then(function (respuesta) {
                return respuesta.text()
            }).then(function (text) {
                console.log(text)
                if(text == "False"){
                  Alert.info('Necesario Iniciar Sesión o Registrarse ','Info',{displayDuration: 3000})
                    setLoginForm()
                }else{
                  console.log(text)
                  showReserva(piso)
                }
                // if(text = "False"){
                //     Alert.info('Necesario Iniciar Sesión o Registrarse ','Info',{displayDuration: 3000})
                //     setLoginForm()
                // }else{
                    
                // }  
            })

    }
}


function reservar(piso) {
  // event.preventDefault()
  return function(){
    event.preventDefault()
    // let inicio = document.getElementById('dateIni').innerText
    let inicio = document.forms.stepByStepForm['dateIni'].value
    let fin = document.forms.stepByStepForm['dateFin'].value
    let numero = document.forms.stepByStepForm['numero-tarjeta'].value
    let id = piso.idEst
  
    let data = {
        dateIn: inicio,
        dateFin: fin,
        numtarjeta: numero,
        pisoId: id
    }
  
    // if (email != "" && pass != "") {                                      //Falta validar email
                    fetch("http://localhost:8000/reservar", {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (respuesta) {
                        return respuesta.text()
                    }).then(function (text) {
                      console.log(text)
                        if(text == "Error"){
                            // alert("Contraseña Incorrecta")
                            Alert.error('No se ha podido realizar la Reserva','Error',{displayDuration: 3000})
                        }  
                        // else if(text == "UserError"){
                        //     Alert.error('El Usuario : ' + text + ' no existe','Login Error',{displayDuration: 3000})
                        // }
                        else{
                            Alert.success('Reserva realizada con éxito','Reserva Realizada',{displayDuration: 6000, pos: 'top'})
                            home()
                        }   
                    })


  }

}

var zona_misreservas = document.getElementById("zona-misreservas");

function getReservas(){
    
  // return function(){
      
      let url = new URL("http://localhost:8000/reservas");
      // url = url.toString().replace("param-city", cityName) //Hay que pasarlos a string previamente
      
      // let zonaPisos = document.getElementById("zonaPisos"); //Esta línea no es necesaria , pero es por Info

      fetch(url)
          .then(function (respuesta) {
              return respuesta.json()
          }).then(function (reservas) {
              console.log(reservas)
              document.getElementById("fondo").style.display = "none";
              document.getElementById("swiper-wrap").style.display = "none";
              zonaPisos.innerHTML = ""
              zonaPisos.style.display = "none";
              reservas.forEach(printDivReservas)
              zona_misreservas.style.display = "flex";
          })

  // }
}

function newDiv(i,text){
  let div = document.createElement("div");
  if(i == "class"){
    div.setAttribute("class", text);
  }
  else if(i == "id"){
    div.setAttribute("id", text);
  }

  return div;
} 


function printDivReservas(reserva){
   
  let div = newDiv("class","divReservas");
  // div.setAttribute("class", "divReservas");
  let titulo = newDiv("class","tituloMiReserva");
  
  let h1 = document.createElement("h1");
  h1.innerHTML = "Piso en " + reserva.idEst.direccion;
  let div2 = newDiv("class","infoMiReserva");
  let div3 = newDiv("class","data-infoMiReserva");

  // let div2 = document.createElement("div");
  // let div3 = document.createElement("div");

  let h4 = document.createElement("h4")
  h4.innerHTML = "Usuario : " +  reserva.idCliente.email + " , " + reserva.idCliente.nombre + " " + reserva.idCliente.pApellido + " " + reserva.idCliente.sApellido;
  let fechaInicio = new Date(reserva.fechaInicio)
  let fechaFinal = new Date(reserva.fechaFinal);
  let fechas = document.createElement("h4")
  fechas.innerHTML = "Reserva desde " + fechaInicio.toLocaleDateString() + " a " + fechaFinal.toLocaleDateString();
  let precio = document.createElement("h4")
  precio.innerHTML = "Precio : " + reserva.idEst.precioMes + " €/Mes  y " + reserva.idEst.fianza + " € de fianza" 
  let imagen = image("images/proyecto/pisos/MADRID/JacintoBenavente.jpg")
  imagen.setAttribute('class','fotoReservado')
  let hr = document.createElement("hr")

  let btMas = newDiv("class","btMas");
  let ver_mas = document.createElement("button")
  ver_mas.setAttribute("id","ver_mas")
  ver_mas.innerHTML = "Ver más"
  
  titulo.appendChild(h1);
  btMas.appendChild(ver_mas);

  div3.append(h4,fechas,precio);
  div2.append(imagen,div3);
  div.append(titulo,hr,div2,btMas);
  // $("body").css("background-color","white")
  // div.appendChild(h1)
  // div.appendChild(getList(piso))
  // div.addEventListener("click", printPiso2(piso))

  zona_misreservas.append(div);

}


function getPisosFiltro(){
      
   let selectCity = document.getElementById('Provincia');
   let selectTipo = document.getElementById('Alquiler');
// select.addEventListener('change', function(){
// selectedOption = this.options[select.selectedIndex];
// console.log(selectedOption.value + ': ' + selectedOption.text);
// });   

   let selectedCity = selectCity.options[selectCity.selectedIndex].value 
   let selectedTipo = selectTipo.selectedIndex
   let tipoAlquiler = 'piso'

   if(selectedTipo == 1){
      tipoAlquiler = 'habitacion'
   }
   
   let data = {
    city: selectedCity,
    tipo: tipoAlquiler
}

      // let cityName = selectedOption.value
      // console.log(selectedCity)
      // console.log(tipoAlquiler)
      // console.log(selectedTipo)
  
    // if (email != "" && pass != "") {                                      //Falta validar email
                    fetch("http://localhost:8000/filtroPisos", {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (respuesta) {
                      return respuesta.json()
                    }).then(function (pisos) {
                      // console.log(pisos)
                      document.getElementById("fondo").style.display = "none";
                      document.getElementById("swiper-wrap").style.display = "none";
                      zonaPisos.style.display = "flex";
                      zonaPisos.innerHTML = ""
                      pisos.forEach(printDivPisos)
                  })

}


function comprobarDisponible(piso){
  
  return function(e){
    e.preventDefault()
    let inicio = document.forms.stepByStepForm['dateIni'].value
  let fin = document.forms.stepByStepForm['dateFin'].value
  // let numero = document.forms.stepByStepForm['numero-tarjeta'].value
  let id = piso.idEst


  let data = {
    dateIn: inicio,
    dateFin: fin,
    pisoId: id
}

                fetch("http://localhost:8000/comprobarDisponible", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (respuesta) {
                    return respuesta.text()
                }).then(function (text) {
                  console.log(text)
                    if(text == "Disponible"){
                      Alert.success('El piso está disponible en esas fechas!','Disponible',{displayDuration: 6000, pos: 'top'})
                      checkDisponible.style.display = "none";
                      previousButton.style.display = "block";
                      nextButton.style.display = "block";
                      

                    }
                    else if(text == "No disponible"){
                      Alert.error('El piso está ocupado en esas fechas!','No Disponible',{displayDuration: 6000, pos: 'top'})
                    } 
                })


  }
 
}





$('input[name="phone"]').mask('(000) 000 0000');
$('input[name="tarjeta"]').mask('0000-0000-0000-0000');


function home(){
  
  let bodyElements = document.body.children

  bodyElements[2].style.display = "flex";//fondo
  bodyElements[4].style.display = "none";//form
  bodyElements[5].style.display = "block";//swiper
  bodyElements[6].style.display = "none";//zonaInfo
  bodyElements[7].innerHTML='';//zonaPisos
  bodyElements[8].style.display = "none"; // formReserva
  bodyElements[9].style.display = "none"; // zonaMisReservas
  bodyElements[9].innerHTML=''
  // zona_misreservas.innerHTML=''
  // zona_misreservas.style.display = "none"
  inicializarInputDate()
  cleanDataForms()
}


























        var Alert = undefined;

(function(Alert) {
  var alert, error, trash, info, success, warning, _container;
  info = function(message, title, options) {
    return alert("info", message, title, "fa fa-info-circle", options);
  };
  warning = function(message, title, options) {
    return alert("warning", message, title, "fa fa-warning", options);
  };
  error = function(message, title, options) {
    return alert("error", message, title, "fa fa-exclamation-circle", options);
  };

  trash = function(message, title, options) {
    return alert("trash", message, title, "fa fa-trash-o", options);
  };

  success = function(message, title, options) {
    return alert("success", message, title, "fa fa-check-circle", options);
  };
  alert = function(type, message, title, icon, options) {
    var alertElem, messageElem, titleElem, iconElem, innerElem, _container;
    if (typeof options === "undefined") {
      options = {};
    }
    options = $.extend({}, Alert.defaults, options);
    if (!_container) {
      _container = $("#alerts");
      if (_container.length === 0) {
        _container = $("<ul>").attr("id", "alerts").appendTo($("body"));
      }
    }
    if (options.width) {
      _container.css({
        width: options.width
      });
    }
    alertElem = $("<li>").addClass("alert").addClass("alert-" + type);
    setTimeout(function() {
      alertElem.addClass('open');
    }, 1);
    if (icon) {
      iconElem = $("<i>").addClass(icon);
      alertElem.append(iconElem);
    }
    innerElem = $("<div>").addClass("alert-block");
    //innerElem = $("<i>").addClass("fa fa-times");
    alertElem.append(innerElem);
    if (title) {
      titleElem = $("<div>").addClass("alert-title").append(title);
      innerElem.append(titleElem);
      
    }
    if (message) {
      messageElem = $("<div>").addClass("alert-message").append(message);
      //innerElem.append("<i class="fa fa-times"></i>");
      innerElem.append(messageElem);
      //innerElem.append("<em>Click to Dismiss</em>");
//      innerElemc = $("<i>").addClass("fa fa-times");

    }
    if (options.displayDuration > 0) {
      setTimeout((function() {
        leave();
      }), options.displayDuration);
    } else {
      innerElem.append("<em>Click to Dismiss</em>");
    }
    alertElem.on("click", function() {
      leave();
    });

    function leave() {
      alertElem.removeClass('open');
      alertElem.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        return alertElem.remove();
      });
    }
    return _container.prepend(alertElem);
  };
  Alert.defaults = {
    width: "",
    icon: "",
    displayDuration: 3000,
    pos: ""
  };
  Alert.info = info;
  Alert.warning = warning;
  Alert.error = error;
  Alert.trash = trash;
  Alert.success = success;
  return _container = void 0;

})(Alert || (Alert = {}));

this.Alert = Alert;

$('#test').on('click', function() {
  Alert.info('Message');
});



//#region Admin

// let menu = document.getElementById('menu')
// menu.children[3].style.display = "block"
// menu.children[3].addEventListener("click",getReservas)

function getClientesAdmin(){
    
  // return function(){
      
      let url = new URL("http://localhost:8000/clientesAdmin");
      // url = url.toString().replace("param-city", cityName) //Hay que pasarlos a string previamente
      
      // let zonaPisos = document.getElementById("zonaPisos"); //Esta línea no es necesaria , pero es por Info

      fetch(url)
          .then(function (respuesta) {
              return respuesta.json()
          }).then(function (clientes) {
              console.log(clientes)
              document.getElementById("fondo").style.display = "none";
              document.getElementById("swiper-wrap").style.display = "none";
              zonaPisos.innerHTML = ""
              zonaPisos.style.display = "none";
              // let wrap  = newDiv("id","wrapClientes");

              // clientes.forEach(printDivClientes);
              // zona_misreservas.appendChild(wrap);
              zona_misreservas.style.display = "flex"
              zona_misreservas.innerHTML=""
              let promise = new Promise((resolve, reject) => {
                zona_misreservas.appendChild(newDiv("id","wrapClientes"))
                resolve(clientes)
              });
              promise.then((clientes) => clientes.forEach(printDivClientes)
              );
              


              // let promise = new Promise((resolve, reject) => {
              //     zona_misreservas.innerHTML=''
              //     zona_misreservas.style.display = "flex"
              //   resolve(true)
              // });
              // promise.then(
              // (clientes) => clientes.forEach(printDivClientes)
              // );
              
          })

  // }
}


function getPisosAdmin(){
    
  // return function(){
      
      let url = new URL("http://localhost:8000/pisosAdmin");
      // url = url.toString().replace("param-city", cityName) //Hay que pasarlos a string previamente
      
      // let zonaPisos = document.getElementById("zonaPisos"); //Esta línea no es necesaria , pero es por Info

      fetch(url)
          .then(function (respuesta) {
              return respuesta.json()
          }).then(function (pisos) {
              console.log(pisos)

              document.getElementById("fondo").style.display = "none";
              document.getElementById("swiper-wrap").style.display = "none";
              zonaPisos.innerHTML = ""
              zonaPisos.style.display = "none";
              // let wrap  = newDiv("id","wrapClientes");

              // clientes.forEach(printDivClientes);
              // zona_misreservas.appendChild(wrap);
              zona_misreservas.style.display = "flex"
              zona_misreservas.innerHTML=""
              topAdmin("Piso");
              let promise = new Promise((resolve, reject) => {
                zona_misreservas.appendChild(newDiv("id","wrapClientes"))
                resolve(pisos)
              });
              promise.then((pisos) => pisos.forEach(printDivPisosAdmin)
              );
          })

  // }
}
  


function getReservasAdmin(){
    
  // return function(){
      
      let url = new URL("http://localhost:8000/reservasAdmin");
      // url = url.toString().replace("param-city", cityName) //Hay que pasarlos a string previamente
      
      // let zonaPisos = document.getElementById("zonaPisos"); //Esta línea no es necesaria , pero es por Info

      fetch(url)
          .then(function (respuesta) {
              return respuesta.json()
          }).then(function (reservas) {
              // console.log(reservas)
              // document.getElementById("fondo").style.display = "none";
              // document.getElementById("swiper-wrap").style.display = "none";
              // zonaPisos.innerHTML = ""
              // zonaPisos.style.display = "none";
              // reservas.forEach(printDivReservasAdmin)
              // zona_misreservas.style.display = "flex";



              console.log(reservas)
              document.getElementById("fondo").style.display = "none";
              document.getElementById("swiper-wrap").style.display = "none";
              zonaPisos.innerHTML = ""
              zonaPisos.style.display = "none";
              // let wrap  = newDiv("id","wrapClientes");

              // clientes.forEach(printDivClientes);
              // zona_misreservas.appendChild(wrap);
              zona_misreservas.style.display = "flex"
              zona_misreservas.innerHTML=""
              let promise = new Promise((resolve, reject) => {
                zona_misreservas.appendChild(newDiv("id","wrapClientes"))
                resolve(reservas)
              });
              promise.then((reservas) => reservas.forEach(printDivReservasAdmin)
              );
              

          })

  // }
}

function topAdmin(text){
 
  // let titulo = document.createElement('h1');
  // titulo.innerHTML = "Listado de " + text;
  let btdiv = newDiv('class','listado-top');

  let filtro = newDiv('class','listado-filtro');

  let input = document.createElement('input');
  input.setAttribute('type','text');

  let btfiltro = document.createElement('button');
  btfiltro.innerHTML = 'Buscar';

  let btNuevo = document.createElement('button');
  btNuevo.innerHTML = 'Nuevo ' + text;
  
  filtro.append(input,btfiltro);
  btdiv.append(filtro, btNuevo);
  zona_misreservas.appendChild(btdiv);

}


function printDivClientes(cliente){
  
  
  let wrap  = document.getElementById("wrapClientes");
  let div = newDiv("class","divClientes");
  

  let h4 = document.createElement("h4");
  h4.innerHTML = "Usuario: " + cliente.email;
  
  let buttons = newDiv("class","btsCliente");
  let edit = document.createElement("button");
  let show = document.createElement("button");

  show.innerHTML = "<i class='fas fa-eye'></i>";
  edit.innerHTML = "<i class='fas fa-pen'></i>";

  show.onclick = getReservasCliente(cliente)
  edit.onclick = CreateEditClientForm(cliente)
  buttons.append(edit,show);
  div.append(h4,buttons);
  wrap.append(div);

  
}


function printDivPisosAdmin(piso){
  
  
  let wrap  = document.getElementById("wrapClientes");
  let div = newDiv("class","divClientes");
  let wrap_info = newDiv("class","wrap-info");
  let info = document.createElement("h5");
  info.innerHTML = "Piso en : " +  piso.direccion + " , " + piso.idCiudad.nombre;

  let precio = document.createElement("p");
  precio.innerHTML = "Precio : " +  piso.precioMes  + " €/Mes  y " + piso.fianza + " € de fianza";
  
  let imagen = image("images/proyecto/pisos/MADRID/JacintoBenavente.jpg")
  imagen.setAttribute('class','fotoReservado')
  
  wrap_info.append(info,precio)

  let piso_info = newDiv("class","admin-piso-info");
  piso_info.append(imagen,wrap_info);
  
  let buttons = newDiv("class","btsCliente");
  let borrar = document.createElement("button");
  let edit = document.createElement("button");
  let show = document.createElement("button");
  
  borrar.innerHTML = "<i class='fas fa-ban'></i>";
  show.innerHTML = "<i class='fas fa-eye'></i>";
  edit.innerHTML = "<i class='fas fa-pen'></i>";

  // show.onclick = getReservasCliente(cliente)
  // edit.onclick = CreateEditClientForm(cliente)
  buttons.append(show,edit,borrar);
  div.append(piso_info,buttons);
  wrap.append(div);

  
}



function printDivReservasAdmin(reserva){
  
  
  let wrap  = document.getElementById("wrapClientes");
  let div = newDiv("class","divClientes");
  let piso = document.createElement("h4");
  piso.innerHTML = "Piso en : " +  reserva.idEst.direccion + " , " + reserva.idEst.idCiudad.nombre;

  let usu = document.createElement("h4");
  usu.innerHTML = "Usuario : " +  reserva.idCliente.email + " , " + reserva.idCliente.nombre + " " + reserva.idCliente.pApellido + " " + reserva.idCliente.sApellido;
  let fechaInicio = new Date(reserva.fechaInicio)
  let fechaFinal = new Date(reserva.fechaFinal);
  let fechas = document.createElement("h4")
  fechas.innerHTML = "Reserva desde " + fechaInicio.toLocaleDateString() + " a " + fechaFinal.toLocaleDateString();
  

  let res_info = newDiv("class","admin-res-info");

  res_info.append(piso,usu,fechas);
  
  let buttons = newDiv("class","btsCliente");
  let edit = document.createElement("button");
  let show = document.createElement("button");

  show.innerHTML = "<i class='fas fa-eye'></i>";
  edit.innerHTML = "<i class='fas fa-ban'></i>";

  // show.onclick = getReservasCliente(cliente)
  // edit.onclick = CreateEditClientForm(cliente)
  buttons.append(edit,show);
  div.append(res_info,buttons);
  wrap.append(div);

  
}

//#endregion


function getReservasCliente(cliente){
    
  return function(){
      
      let url = new URL("http://localhost:8000/reservascliente?id=id-cliente");
      url = url.toString().replace("id-cliente", cliente.id) //Hay que pasarlos a string previamente

      fetch(url)
          .then(function (respuesta) {
              return respuesta.json()
          }).then(function (reservas) {
              console.log(reservas)
              document.getElementById("fondo").style.display = "none";
              document.getElementById("swiper-wrap").style.display = "none";
              let promise = new Promise((resolve, reject) => {
                zonaPisos.innerHTML = ""
                zonaPisos.style.display = "none";
                zona_misreservas.innerHTML = ""
                resolve(reservas)
              });
              promise.then((reservas) => reservas.forEach(printDivReservas)
              );
              
          })

  }
}


function CreateEditClientForm(cliente){
    
  return function(){
       
  let div = newDiv("class","form");
  let form = document.createElement("form")
  
  
  let h1 = document.createElement("h1");
  h1.innerHTML = "Editar Usuario: " + cliente.email;

  let nombre = document.createElement("input");
  nombre.setAttribute("type", "text");
  nombre.setAttribute("name", "nombre");
  nombre.setAttribute("placeholder", "Nombre");
  nombre.setAttribute("value", cliente.nombre);
  // input2.setAttribute("value", "Reintegro");
  // input2.setAttribute("id", "reintegro");
  let papellido = document.createElement("input");
  papellido.setAttribute("type", "text");
  papellido.setAttribute("name", "papellido");
  papellido.setAttribute("placeholder", "Primer Apellido");

  let sapellido = document.createElement("input");
  sapellido.setAttribute("type", "text");
  sapellido.setAttribute("name", "sapellido");
  sapellido.setAttribute("placeholder", "Segundo Apellido");

  let password = document.createElement("input");
  password.setAttribute("type", "password");
  password.setAttribute("name", "password");
  password.setAttribute("placeholder", "Contraseña");

  let guardar = document.createElement("input");
  guardar.setAttribute("type", "submit");
  guardar.setAttribute("value", "Guardar");
  guardar.setAttribute("id", "saveEdit");
  
  form.append(h1,nombre,papellido,sapellido,password,guardar);
  div.appendChild(form);
  
  let promise = new Promise((resolve, reject) => {
    let admin_forms = document.getElementById("admin-forms")
    admin_forms.style.display = "flex"
    admin_forms.innerHTML='';
    zona_misreservas.innerHTML='';
    resolve(admin_forms)
  });
  promise.then((admin_forms) => admin_forms.appendChild(div)
  );
  
  }  

}

