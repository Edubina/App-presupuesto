//Arreglo llamado ingresos que contiene los ingresos que se van a ingresar en el presupuesto 
const ingresos = [
    new Ingreso('Salario', 2100.00),
    new Ingreso('Venta coche', 1500),
];

//Arreglo llamado egresos que contiene los egresos que se van a ingresar en el presupuesto
const egresos = [
    new Egreso('Renta departamento', 1000),
    new Egreso('Ropa', 800)
];

//Funcion flecha que se encarga de mostrar el encabezao, sus ingresos y egresos en el html a la hora de cargar la pagina con el elemento onload
let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

//Funcion tipo flecha que se encarga de sumar todos los ingresos que se encuentran en el arreglo de ingresos
let totalIngresos = ()=>{
    let totalingreso = 0;
    for (let ingreso of ingresos){
        totalingreso += ingreso.valor;
    }
    return totalingreso;
}

//Funcion tipo flecha que se encarga de sumar todos los egresos que se encuentran en el arreglo de egresos
let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

//funcion de tipo flecha que se encarga de cargar toda la informacion del encabezado del presupuesto en el html 
let cargarCabecero = ()=>{
    //Variables que se encargan de almacenar los valores de los ingresos y egresos, ademas reaaliza el calculo del presupuesto total y su porcentaje de gasto
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    //GetElementById para obtener el elemento que se encuentra en el html con el id y asignarle el valor al elemento con el id en el html 
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

//funcion formato moneda que se encarga de formatear el valor que se a proporcionado 
const formatoMoneda = (valor)=>{
  return  valor.toLocaleString('es-GT', {style: 'currency', currency: 'GTQ', minimunFractionDigits: 2});
}

 //funcion formato porcentaje que se encarga de darle formato a los porcentajes 
const formatoPorcentaje = (valor)=>{ //En style se coloca el estilo del formato que se desea % y en minimumFractionDigits se coloca el numero de decimales que se desea
    return valor.toLocaleString('es-GT', {style: 'percent', minimumFractionDigits: 2}); 
}

//Funcion titpo flecha que se encarga de mostrar el total de los ingresos en el html 
const cargarIngresos = () =>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHtml(ingreso); //Se le asigna el valor de la funcion crearIngresoHtml a la variable ingresosHTML
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}

//Funcion tipo flecha que se encarga de crear la plantilla de los ingresos, se utiliza un template string para poder mostrar los valores de los ingresos en el html
const crearIngresoHtml = (ingreso)=>{
    let ingresosHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>  <!--se coloca la variable ingreso.descripcion para mostrar la descripcion del ingreso-->
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div> <!--se coloca la variable ingreso.valor para mostrar el valor del ingreso-->
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                  onclick="eliminarIngreso(${ingreso.idIngreso})"></ion-icon> <!--se coloca la variable ingreso.idIngreso para eliminar el ingreso por medio del evento onclick-->
            </button>
        </div>
    </div>
    </div>
    `;
    return ingresosHTML;
}

//funcion tipo flecha que se encarga de eliminar el increso al dar click en el boton eliminar 
let eliminarIngreso = (idIngreso)=>{
    //findIndex es una funcion que se encarga de buscar el indice del elemento que se desea eliminar 
    let indicedEliminar = ingresos.findIndex(ingreso => ingreso.idIngreso === idIngreso);
    //splice es una funcion que se encarga de eliminar el elemento que se desea eliminar
    ingresos.splice(indicedEliminar, 1);
    //Se llava a las funciones para que se actualicen los valores de los ingresos 
    cargarCabecero();
    cargarIngresos();
}

//EGRESOS, mismo procedimiento que los ingresos
const cargarEgresos = () =>{
    let egresohtml = '';
    for(let egreso of egresos){
        egresohtml += crearEgresoHtml(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresohtml;
}

const crearEgresoHtml = (egreso)=>{
    let porcentajeValor = egreso.valor/totalIngresos();
    let egresohtml = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarestilos">
                        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(porcentajeValor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                    onclick="eliminarEgresos(${egreso.idEgreso})"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `;
    return egresohtml;
}

let eliminarEgresos = (idEgreso)=>{
    let indiceEliminarEgreso = egresos.findIndex(egreso => egreso.idEgreso === idEgreso);
    console.log(indiceEliminarEgreso);
    egresos.splice(indiceEliminarEgreso, 1);
    cargarCabecero();
    cargarEgresos();
}


let agregarDato = ()=>{
    let formulario = document.forms["forma"];
    let descripcion = formulario["descripcion"];
    let valor = formulario["valor"];
    let tipo = formulario["tipo"];

   if(descripcion.value != "" && valor.value != ""){
       console.log(tipo.value);
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            console.log(descripcion.value, +valor.value);
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === "egreso"){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}