const form = document.querySelector("#form");
const contenedor = document.querySelector(".contenedor");

form.addEventListener('submit', validaForm);

function validaForm(e){
    e.preventDefault();
    const rango = Number.parseInt(document.querySelector("#rango").value);
    const numeros = Number.parseInt(document.querySelector("#numeros").value);
    const sePuedenRepetir = document.querySelector("#repetir").checked;

    limpiaNumeros()
    if(Number.isNaN(rango) || Number.isNaN(numeros)){
        generaMensajeError("Todos los campos son obligatorios");
        return;
    }

    if(numeros < 1){
        generaMensajeError("El número debe ser mayor o igual a 1");
        return
    }
    
    if(numeros > 300){
        generaMensajeError("El número debe ser menor o igual a 300");
        return
    }

    if(rango < 1){
        generaMensajeError("El rango debe ser mayor o igual a 1");
        return
    }
    
    if(!sePuedenRepetir && numeros > rango){
        generaMensajeError("El rango debe ser mayor si no se pueden repetir");
        return;
    }

    const arregloNumeros = generaNumerosAleatorios(rango, numeros, sePuedenRepetir);

    muestraNumerosAleatorios(arregloNumeros)
}

function generaMensajeError(mensajetext){
    const mensaje = document.createElement('P');
    const mensajeDuplicado = document.querySelector(".mensajeError")
    mensajeDuplicado != null ? mensajeDuplicado.remove() : ''

    mensaje.textContent = mensajetext;
    mensaje.classList.add("mensajeError");

    contenedor.appendChild(mensaje);
    setTimeout(() => {
        mensaje.remove();
    }, 3000);
}

function generaNumerosAleatorios(rango, numeros, repetir){
    const arreglo = [];

    
    while(arreglo.length < numeros){
        const numero = Math.floor(Math.random() * (rango + 1)); 
        if (!repetir){
            !arreglo.includes(numero) ? arreglo.push(numero):''
        }else{
            arreglo.push(numero)
        }
    } 

    return arreglo;
}

function muestraNumerosAleatorios(arreglo){
    const contenedor = document.querySelector("#contenedorNumeros");
    contenedor.classList.add("contenedorNumeros")
    const contenedorUl = document.createElement("UL");
    contenedorUl.classList.add("listaNumeros")    
    const ListaContenedor = document.querySelector(".listaNumeros");
    ListaContenedor != null ? limpiaNumeros : ''
    
    arreglo.forEach(element => {
        arrayColor = generaNumerosAleatorios(255, 3, true)

        const li = document.createElement('LI')
        const liDiv = document.createElement('DIV')
        const liBorder = document.createElement('DIV')

        liDiv.classList.add("numeroLiAro")
        liBorder.classList.add("numeroLiBorder")
        liBorder.textContent = element.toString()       
        liBorder.style.borderColor = `rgb(${arrayColor[0]}, ${arrayColor[1]}, ${arrayColor[2]})`  
        liDiv.appendChild(liBorder)

        li.appendChild(liDiv)
        li.classList.add("numeroLi")
        li.style.backgroundColor = `rgb(${arrayColor[0]}, ${arrayColor[1]}, ${arrayColor[2]})`

        contenedorUl.appendChild(li)
    });

    contenedor.appendChild(contenedorUl)
}

function limpiaNumeros(){
    const contenedor = document.querySelectorAll(`.numeroLi`);
    contenedor.length > 0 ? contenedor.forEach(e => e.remove()):''
}