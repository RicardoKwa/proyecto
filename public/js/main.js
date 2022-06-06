let idioma = document.getElementById("idioma").innerHTML
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
    
    let idioma = document.getElementById("idioma").innerHTML
    let div = document.createElement("div");
    div.setAttribute("class", "divPisos");

    let idHide = document.createElement("p")
    idHide.innerHTML = piso.id
    idHide.hidden = true
    
    let h1 = document.createElement("h1")
   
    if(piso.tipoEst == "piso"){
        h1.innerHTML = "Piso en " + piso.direccion;
    }else{
      h1.innerHTML = "Habitación en " + piso.direccion;
    }
   
    

    let imagen = image("images/proyecto/pisos/MADRID/JacintoBenavente.jpg")
    imagen.setAttribute('class','foto')

    div.append(idHide)
    div.appendChild(imagen)
    div.appendChild(h1)
    div.appendChild(getList(piso))
    div.addEventListener("click", printPiso(piso))

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
    let idioma = document.getElementById("idioma").innerHTML
    
    switch (indice) {
        case 0:
          if(idioma == "english"){
            auxDataList(li,"fas fa-door-open","Bedrooms " + piso.idCar.numHab)
          }else{
            auxDataList(li,"fas fa-door-open","Habitaciones " + piso.idCar.numHab)
          }        
          break;
        case 1:
          if(idioma == "english"){
            auxDataList(li,"fas fa-bath","Toilets " + piso.idCar.numBanos)
          }else{
            auxDataList(li,"fas fa-bath","Baños " + piso.idCar.numBanos)
          }           
          break;
        case 2:
          if(idioma == "english"){
            auxDataList(li,"fas fa-euro-sign","Price " + piso.precioMes + "/Month")
          }else{
            auxDataList(li,"fas fa-euro-sign","Precio " + piso.precioMes + "/Mes")
          }   
          break;
        case 3:
          if(idioma == "english"){
            auxDataList(li,"fas fa-wallet","Deposit €" + piso.fianza)
          }else{
            auxDataList(li,"fas fa-wallet","Fianza " + piso.fianza + " €")
          }           
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
                    fetch("http://localhost:8000/register", {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (respuesta) {
                       return respuesta.text()
                    }).then(function (text) {
                      Alert.success('Se ha registrado correctamente , Usuario : ' +  text,'Registro',{displayDuration: 6000, pos: 'top'})
                      okLog()
                    })

                } else {
                  Alert.error('Las contraseñas no coinciden','Revise contraseñas',{displayDuration: 6000, pos: 'top'})
                }
    } else {
      Alert.warning('Campos requeridos sin rellenar','Rellene el formulario',{displayDuration: 6000, pos: 'top'})
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


function printPiso(piso,idioma){
  return function(){
      
      let zonaInfo = document.getElementById("zonaInfo");
      let hidden = document.getElementById("idioma")
      hidden.innerHTML = idioma;
      document.getElementById("zonaPisos").innerHTML=""
      let array = document.getElementsByClassName("prueba")
      auxPrintPiso(array)
      zonaInfo.style.display="flex";
      let imagen;
      if(idioma == "english"){
        imagen = image("images/proyecto/iconos/espana.png");
        imagen.onclick = printPiso(piso);
      }else{
        imagen = image("images/proyecto/iconos/reino-unido.png");
        imagen.onclick = printPiso(piso,"english");
      }
      imagen.setAttribute("class","bandera");
      if(limpiarDiv(zonaInfo.children[0].children[4])){
        zonaInfo.children[0].children[4].append( imagen,showPisoData(piso),
        caracteristicas(piso.idCar,auxCar,"car"),caracteristicas(piso.idReg,auxReg,"reg"));
        
        if(zonaInfo.children[0].children[4].appendChild(mapa())) initialize() 
        
        
        zonaInfo.children[1].append(buttonReserva(piso));
        
        // console.log(piso)
      }     
  }
}

function showPisoData(piso){
    let idioma = document.getElementById("idioma").innerHTML
    let h1 = document.createElement("h1")
    if(piso.tipoEst == "piso"){
      if(idioma == "english"){
        h1.innerHTML = "Flat to rent,  " + piso.direccion;
      }else{
        h1.innerHTML = "Piso en " + piso.direccion;
      }
    }else{
      if(idioma == "english"){
        h1.innerHTML = "1 Bed Flat to rent,  " + piso.direccion;
      }else{
        h1.innerHTML = "Habitación de Piso en " + piso.direccion;
      }
    }
    // h1.innerHTML = "Piso en " + piso.direccion;
    let div = document.createElement("div");
    div.append(h1,getList(piso))
    div.setAttribute("class","infoDiv")
    return div

}

function caracteristicas(obj,callback,text){
    let idioma = document.getElementById("idioma").innerHTML
    let div = document.createElement("div");
    let titulo = document.createElement("h1");
    if(text == "car"){
      if(idioma == "english"){
        titulo.innerHTML = "Features";
      }else{
        titulo.innerHTML = "Características";
      }
    }else{
      if(idioma == "english"){
        titulo.innerHTML = "Rules";
      }else{
        titulo.innerHTML = "Reglas";
      }
    }   
    let ul = document.createElement("ul");
    for (atr in obj) {

        let li = callback(atr,obj)

        if(li.innerHTML != "")  ul.append(li)
        //   if(li.innerHTML != "")
      }
    div.append(titulo,ul)
    div.setAttribute('class','infoDiv')
    return div
}

function auxCar(atr,obj){

  let idioma = document.getElementById("idioma").innerHTML;
  
    let li = document.createElement("li")   
    switch (atr) {        
        case "television":
          if(obj[atr]) li.append(newIcon("fas fa-tv"),"TV") 
          break;
        case "amueblado":
          if(obj[atr]){
            if(idioma == "english"){
              li.append(newIcon("fas fa-couch"),"Furnished")
            }else{
              li.append(newIcon("fas fa-couch"),"Amueblado")
            }
            }   
        break;
        case "llaveDormitorio":
          if(obj[atr]){
            if(idioma == "english"){
              li.append(newIcon("fas fa-key"),"Bedroom Key")
            }else{
              li.append(newIcon("fas fa-key"),"Llave Dormitorio")
            }
            }       
        break;
        case "calefaccion":
          if(obj[atr]){
            if(idioma == "english"){
              li.append(newIcon("fas fa-temperature-high"),"Heating") 
            }else{
              li.append(newIcon("fas fa-temperature-high"),"Calefacción") 
            }
          }
        break;
        case "exterior":
          if(obj[atr]){
            if(idioma == "english"){
              li.append(newIcon("fas fa-tree"),"Outside") 
            }else{
              li.append(newIcon("fas fa-tree"),"Exterior") 
            }
          }
        break;
        case "ascensor":
          if(obj[atr]){
            if(idioma == "english"){
              li.append(newIcon("fas fa-arrow-up"),"Lift") 
            }else{
              li.append(newIcon("fas fa-arrow-up"),"Ascensor") 
            }
          }
        break;        
        case "aireAcond":
          if(obj[atr]){
            if(idioma == "english"){
              li.append(newIcon("fas fa-fan"),"Air-Conditioning") 
            }else{
              li.append(newIcon("fas fa-fan"),"Aire Acond.") 
            }
          }
        break;
        case "garaje":
          if(obj[atr]){
            if(idioma == "english"){
              li.append(newIcon("fas fa-warehouse"),"Garage")  
            }else{
              li.append(newIcon("fas fa-warehouse"),"Garaje") 
            }
          }
        break;
        case "lavadora":
          if(obj[atr]){
            if(idioma == "english"){
              li.append(newIcon("fas fa-soap"),"Washer")   
            }else{
              li.append(newIcon("fas fa-soap"),"Lavadora")  
            }
          }
        break;
        case "internet":
          if(obj[atr]) li.append(newIcon("fas fa-wifi"),"Internet") 
        break;
        case "playa":
          if(obj[atr]){
            if(idioma == "english"){
              li.append(newIcon("fas fa-umbrella-beach"),"Beach") 
            }else{
              li.append(newIcon("fas fa-umbrella-beach"),"Playa")   
            }
          }
        break;
        case "cocinaEquipada":
          if(obj[atr]){
            if(idioma == "english"){
              li.append(newIcon("fas fa-sink"),"Equipped Kitchen") 
            }else{
              li.append(newIcon("fas fa-sink"),"Cocina Equipada") 
            }
          }
        break;
        case "luminoso":
          if(obj[atr]){
            if(idioma == "english"){
              li.append(newIcon("fas fa-lightbulb"),"Bright")  
            }else{
              li.append(newIcon("fas fa-lightbulb"),"Luminoso") 
            }
          }
        break;
    }

    return li
}

function auxPrintPiso(array){
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

  let idioma = document.getElementById("idioma").innerHTML;

    let li = document.createElement("li")   
    switch (atr) {        
        case "parejas":
          if(!obj[atr]){
            if(idioma == "english"){
              li.append(newIcon("fas fa-heart"),"No Couples")  
            }else{
              li.append(newIcon("fas fa-heart"),"No Parejas")   
            }
          }  
          break;
        case "mascotas":
          if(!obj[atr]){
              if(idioma == "english"){
                li.append(newIcon("fas fa-dog"),"No Pets") 
              }else{
                li.append(newIcon("fas fa-dog"),"No Mascotas") 
              }
            }     
        break;
        case "fiestas":
          if(!obj[atr]){
            if(idioma == "english"){
              li.append(newIcon("fas fa-gift"),"No Parties") 
            }else{
              li.append(newIcon("fas fa-gift"),"No Fiestas") 
            }
          }  
        break;
        case "fumar":
          if(!obj[atr]){
            if(idioma == "english"){
              li.append(newIcon("fas fa-smoking"),"No Smoking") 
            }else{
              li.append(newIcon("fas fa-smoking"),"No Fumar") 
            }
          }  
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
        let h1 = document.createElement("h1")
        h1.innerHTML = "Piso en " + piso.direccion
        let ul =  document.createElement("ul")
        let hab =  document.createElement("li")
        let bath =  document.createElement("li")
        let precio =  document.createElement("li")
        let fianza =  document.createElement("li")
        hab.innerHTML = "<i class='fas fa-door-open'></i> Habitaciones " + piso.idCar.numHab
        bath.innerHTML = "<i class='fas fa-bath'></i> Baños " + piso.idCar.numBanos
        precio.innerHTML = "<i class='fas fa-euro-sign'></i> Precio " + piso.precioMes + "/Mes"
        fianza.innerHTML = "<i class='fas fa-wallet'></i> Fianza " + piso.fianza + " €"
        ul.append(hab,bath,precio,fianza);
        // div.innerHTML = ""
        if(limpiarDiv(div)){
          let imagen = image("images/proyecto/pisos/MADRID/JacintoBenavente.jpg")
          imagen.setAttribute("id","imgForm")
          console.log(piso.idEst)
          div.append(imagen,h1,ul)
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
            document.getElementById('menu').children[4].style.display = "none"
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
              if(reservas.length > 0){
                document.getElementById("fondo").style.display = "none";
                document.getElementById("swiper-wrap").style.display = "none";
                zonaPisos.innerHTML = ""
                zonaPisos.style.display = "none";
                reservas.forEach(printDivReservas)
                zona_misreservas.style.display = "flex";
              }else{
                Alert.info('No tienes Reservas para ver','Sin Reservas',{displayDuration: 6000, pos: 'top'})
              }
          })

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
// $('input[name="phone"]').mask('(000) 000 0000');
// $('input[name="tarjeta"]').mask('0000-0000-0000-0000');

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
  bodyElements[10].style.display = "none";
  bodyElements[10].innerHTML=''
  bodyElements[11].style.display = "none";

  // zona_misreservas.innerHTML=''
  // zona_misreservas.style.display = "none"
  inicializarInputDate()
  cleanDataForms()   //PROBAR A CAMBIAR CON forms.reset()
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
              // console.log(clientes)
              document.getElementById("fondo").style.display = "none";
              document.getElementById("swiper-wrap").style.display = "none";
              zonaPisos.innerHTML = ""
              zonaPisos.style.display = "none";
              // let wrap  = newDiv("id","wrapClientes");

              // clientes.forEach(printDivClientes);
              // zona_misreservas.appendChild(wrap);
              zona_misreservas.style.display = "flex"
              zona_misreservas.innerHTML=""
              topAdmin("Cliente");
              let promise = new Promise((resolve, reject) => {
                zona_misreservas.appendChild(newDiv("id","wrapClientes"));                
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
              topAdmin("Reserva");
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
  input.setAttribute('id','filtro');
  

  let btfiltro = document.createElement('button');
  btfiltro.setAttribute('id','btfiltro');
  btfiltro.innerHTML = 'Buscar';
  btfiltro.onclick = filtrar(text)
  filtro.append(input,btfiltro);
  if(text == "Piso"){
    input.setAttribute("placeholder","Direccón");
    let btNuevo = document.createElement('button');
    btNuevo.innerHTML = 'Nuevo ' + text;
    btNuevo.onclick = formPiso;
    btdiv.append(filtro, btNuevo);
  }else{
    input.setAttribute("placeholder","email");
    btdiv.append(filtro);
  } 
  zona_misreservas.appendChild(btdiv);

}

function formPiso(){
 
  zona_misreservas.style.display = "none";
  document.getElementById("wrap-piso-form").style.display = "flex";
  document.getElementById("hiddenPiso").value = "New"
  document.forms.piso_form.reset();
  document.getElementById("savePiso").addEventListener("click",savePiso)

}


function savePiso(){
  
  event.preventDefault()
  let selectCity = document.getElementById('select-ciudad');

  let selectedCity = selectCity.options[selectCity.selectedIndex].value 
  
  let tipo,car,playa;
  
  if(document.getElementById('tipoPiso').checked){
    tipo = "piso"
  }else{
    tipo = "habitacion"
  }

  if(document.getElementById('carCompleto').checked){
    car = "completo"
  }else{
    car = "economico"
  }

  if(document.getElementById('playaSi').checked){
    playa = "Si"
  }else{
    playa = "No"
  }

  let reglas = document.getElementsByClassName("check-reglas");
  let regla1,regla2,regla3,regla4;
  if(reglas[0].checked){
  regla1 = true
  }else{
  regla1 = false
  }

  if(reglas[1].checked){
    regla2 = true
  }else{
    regla2 = false
  }

  if(reglas[2].checked){
    regla3 = true
  }else{
    regla3 = false
  }

  if(reglas[3].checked){
    regla4 = true
  }else{
    regla4 = false
  }
  
  let direccion = document.forms.piso_form['direccion_new'].value
  let precio = document.forms.piso_form['precio_new'].value
  let fianza = document.forms.piso_form['fianza_new'].value
  let id = document.forms.piso_form['hiddenPiso'].value
  
  let data = {
   idPiso: id,
   city: selectedCity,
   tipo: tipo,
   car: car,
   playa : playa,
   dir : direccion,
   precio: precio,
   fianza :fianza,
   parejas : regla1,
   mascotas : regla2,
   fiestas : regla3,
   fumar : regla4
}
if (direccion != "" && precio != "" && fianza != "") {
  fetch("http://localhost:8000/newPiso", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(function (respuesta) {
    return respuesta.text()
}).then(function (text) {
  Alert.success('Nuevo piso registrado','Piso registrado',{displayDuration: 6000, pos: 'top'});
  document.getElementById("wrap-piso-form").style.display = "none";
  document.forms.piso_form.reset();
  home();
})
}else{
  Alert.error('Campos requeridos sin rellenar','Rellena los campos',{displayDuration: 6000, pos: 'top'});
}

}


// function radios(text){

// let radios = document.getElementsByName(text);
// let valor;
// for (var i = 0; i <  radios.length; i++) {
//   if (radios[i].checked) {
//     valor = radios[i].checked.value
//     break;
//   }
// }
// return valor;
// }


function printDivClientes(cliente){
  
  
  let wrap  = document.getElementById("wrapClientes");
  let div = newDiv("class","divClientes");
  

  let h4 = document.createElement("h4");
  h4.innerHTML = "Usuario: " + cliente.email;
  
  let buttons = newDiv("class","btsCliente");
  let edit = document.createElement("button");
  let deleteCli = document.createElement("button");

  deleteCli.innerHTML = "<i class='fas fa-ban'></i>";
  edit.innerHTML = "<i class='fas fa-pen'></i>";

  deleteCli.onclick = deleteCliente(cliente.id)
  edit.onclick = CreateEditClientForm(cliente)
  buttons.append(edit,deleteCli);
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
  // let show = document.createElement("button");
  
  borrar.innerHTML = "<i class='fas fa-ban'>Delete</i>";
  // show.innerHTML = "<i class='fas fa-eye'></i>";
  edit.innerHTML = "<i class='fas fa-pen'>Edit</i>";
  

  borrar.onclick = deletePiso(piso.idEst);
  edit.onclick = EditPisoForm(piso);
  // show.onclick = getReservasCliente(cliente)
  // edit.onclick = CreateEditClientForm(cliente)
  buttons.append(edit,borrar);
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
  form.setAttribute("id", "editClientForm");
  
  let h1 = document.createElement("h1");
  h1.innerHTML = "Editar Usuario: " + cliente.email;

  let nombre = document.createElement("input");
  nombre.setAttribute("type", "text");
  nombre.setAttribute("id", "new-nombre");
  nombre.setAttribute("name", "nombre");
  nombre.setAttribute("placeholder", "Nombre");
  nombre.setAttribute("value", cliente.nombre);
  // input2.setAttribute("value", "Reintegro");
  // input2.setAttribute("id", "reintegro");
  let papellido = document.createElement("input");
  papellido.setAttribute("type", "text");
  papellido.setAttribute("id", "new-papellido");
  papellido.setAttribute("name", "papellido");
  papellido.setAttribute("placeholder", "Primer Apellido");
  papellido.setAttribute("value", cliente.pApellido);

  let sapellido = document.createElement("input");
  sapellido.setAttribute("type", "text");
  sapellido.setAttribute("id", "new-sapellido");
  sapellido.setAttribute("name", "sapellido");
  sapellido.setAttribute("placeholder", "Segundo Apellido");
  sapellido.setAttribute("value", cliente.sApellido);

  let password = document.createElement("input");
  password.setAttribute("id", "new-password");
  password.setAttribute("type", "password");
  password.setAttribute("name", "password");
  password.setAttribute("placeholder", "Nueva Contraseña");

  let guardar = document.createElement("button");
  // guardar.setAttribute("type", "submit");
  guardar.setAttribute("id", "saveEdit");
  guardar.innerHTML = "Guardar"
  
  guardar.onclick = editCliente(cliente)

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

function EditPisoForm(piso){

return function(){
formPiso();
if(piso.tipoEst !== "piso"){
  document.forms.piso_form['tipoHab'].checked = true
}

let hidden = document.getElementById("hiddenPiso");
hidden.value = piso.idEst;

let selectCity = document.getElementById('select-ciudad');

selectCity.selectedIndex = piso.idCiudad.idCiudad - 1; 

document.forms.piso_form['direccion_new'].value = piso.direccion
document.forms.piso_form['precio_new'].value = piso.precioMes
document.forms.piso_form['fianza_new'].value = piso.fianza

if(piso.idCar.idCar == 1){
    document.forms.piso_form['carCompleto'].checked = true
    document.forms.piso_form['playaNo'].checked = true
}else if(piso.idCar.idCar == 2){
    document.forms.piso_form['carEconomico'].checked = true
    document.forms.piso_form['playaNo'].checked = true
}else if(piso.idCar.idCar == 3){
    document.forms.piso_form['carCompleto'].checked = true
    document.forms.piso_form['playaSi'].checked = true
}else if(piso.idCar.idCar == 4){
    document.forms.piso_form['carEconomico'].checked = true
    document.forms.piso_form['playaSi'].checked = true
}
console.log(piso.idReg.parejas)
if(piso.idReg.parejas){
  document.forms.piso_form['checkParejas'].checked = true
}
if(piso.idReg.mascotas == true){
  document.forms.piso_form['checkMascotas'].checked = true
}
if(piso.idReg.fiestas == true){
  document.forms.piso_form['checkFiestas'].checked = true
}
if(piso.idReg.fumar == true){
  document.forms.piso_form['checkFumar'].checked = true
}

// if(piso.idCar.idCar == 1){
//   document.forms.piso_form['fianza_new'].value = piso.fianza
// document.forms.piso_form['fianza_new'].value = piso.fianza
// }else if()
// document.forms.piso_form['fianza_new'].value = piso.fianza
// document.forms.piso_form['fianza_new'].value = piso.fianza
// }

}
}

function deletePiso(idPiso){

  return function(){
  let url = new URL("http://localhost:8000/deletepiso?id=param");
  url = url.toString().replace("param", idPiso) //Hay que pasarlos a string previamente
  
  // let zonaPisos = document.getElementById("zonaPisos"); //Esta línea no es necesaria , pero es por Info

  fetch(url)
      .then(function (respuesta) {
          return respuesta.text()
      }).then(function (text) {
          console.log(text)
          getPisosAdmin();
          // document.getElementById("swiper-wrap").style.display = "none";
          // zonaPisos.style.display = "flex";
          // zonaPisos.innerHTML = ""
          // pisos.forEach(printDivPisos)
      })
  }   
}



function editCliente(cliente){

  return function(){

    let new_nombre = document.forms.editClientForm['new-nombre'].value
    let new_papellido = document.forms.editClientForm['new-papellido'].value
    let new_sapellido = document.forms.editClientForm['new-sapellido'].value
    let new_password = document.forms.editClientForm['new-password'].value


    let data = {
        email : cliente.email,
        nombre: new_nombre,
        papellido: new_papellido,
        sapellido: new_sapellido,
        password: new_password
    }

  let url = new URL("http://localhost:8000/editcliente");
  // url = url.toString().replace("param", idPiso) //Hay que pasarlos a string previamente
  
  // let zonaPisos = document.getElementById("zonaPisos"); //Esta línea no es necesaria , pero es por Info

      fetch("http://localhost:8000/editcliente",{
          method: "POST",
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          }
      })
        .then(function (respuesta) {
          return respuesta.text()
      }).then(function (text) {
          home()
          // document.getElementById("swiper-wrap").style.display = "none";
          // zonaPisos.style.display = "flex";
          // zonaPisos.innerHTML = ""
          // pisos.forEach(printDivPisos)
      })
  }   
}


function deleteCliente(idCliente){

  return function(){
  let url = new URL("http://localhost:8000/deletecliente?id=param");
  url = url.toString().replace("param", idCliente) //Hay que pasarlos a string previamente
  
  // let zonaPisos = document.getElementById("zonaPisos"); //Esta línea no es necesaria , pero es por Info

  fetch(url)
      .then(function (respuesta) {
          return respuesta.text()
      }).then(function (text) {
          console.log(text)
          getClientesAdmin();
          // document.getElementById("swiper-wrap").style.display = "none";
          // zonaPisos.style.display = "flex";
          // zonaPisos.innerHTML = ""
          // pisos.forEach(printDivPisos)
      })
  }   
}

function filtrar(text){
  
  return function(){
  let url,email;
  switch (text) {        
    case "Piso":
      let direccion = document.getElementById('filtro').value 
      if(direccion == "Todas" || direccion == "todas"){
        getPisosAdmin();
      }else{
        
      url = new URL("http://localhost:8000/filtrar?t=piso&dir=param");
      url = url.toString().replace("param", direccion)
      
      fetch(url)
      .then(function (respuesta) {
          return respuesta.json()
      }).then(function (pisos) {
          console.log(pisos)
          if(pisos == "No existe"){
              
            Alert.error('No existen pisos en esa dirección','Piso no encontrado',{displayDuration: 6000, pos: 'top'})
  
          }else{
            
            zona_misreservas.innerHTML=""
            topAdmin("Piso");
            zona_misreservas.appendChild(newDiv("id","wrapClientes"))
            pisos.forEach(printDivPisosAdmin)
              
          }
         
      })   
      
      }
         
      break;
    case "Cliente":
      email = document.getElementById('filtro').value  
      if(email == "Todos" || email == "todos"){
        getClientesAdmin();
      }else{
        
        url = new URL("http://localhost:8000/filtrar?t=cliente&email=param");
        url = url.toString().replace("param", email);
        
        fetch(url)
        .then(function (respuesta) {
            return respuesta.json()
        }).then(function (cliente) {
          
          if(cliente == "No existe"){
              
            Alert.error('No existe un usuario con ese email','Usuario no encontrado',{displayDuration: 6000, pos: 'top'})
  
          }else{
              
            zona_misreservas.innerHTML="";
            topAdmin("Cliente");
            zona_misreservas.appendChild(newDiv("id","wrapClientes"));
            printDivClientes(cliente);
  
          }
        })   

      }
     
    break;
    case "Reserva":
      email = document.getElementById('filtro').value
      if(email == "Todos" || email == "todos"){
        getReservasAdmin();
      }else{

      url = new URL("http://localhost:8000/filtrar?t=reserva&email=param");
      url = url.toString().replace("param", email);
      console.log(email);
      fetch(url)
      .then(function (respuesta) {
          return respuesta.json()
      }).then(function (reservas) {
          console.log(reservas);
          
          if(reservas == "No existe"){
            
            Alert.error('No existen reservas de ese usuario','Usuario no encontrado',{displayDuration: 6000, pos: 'top'})

          }else{
              
            zona_misreservas.innerHTML=""
            topAdmin("Reserva");
            zona_misreservas.appendChild(newDiv("id","wrapClientes"))               
            reservas.forEach(printDivReservasAdmin);

          }
                  
      })   

      }  
      
  }
}
   
}











// fetch("http://localhost:8000/comprobarDisponible", {
//   method: "POST",
//   body: JSON.stringify(data),
//   headers: {
//       'Content-Type': 'application/json'
//   }
// }).then(function (respuesta) {