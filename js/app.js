class Form
{
    constructor(idNombre, idEdad, idDNI, idSexo, idPeso, idAltura, idAnio, idAlert)
    {
        this.inputNombre = document.getElementById(idNombre);
        this.inputEdad = document.getElementById(idEdad);
        this.inputDNI = document.getElementById(idDNI);
        this.inputSexo = document.getElementById(idSexo);
        this.inputPeso = document.getElementById(idPeso);
        this.inputAltura = document.getElementById(idAltura);
        this.inputAnio = document.getElementById(idAnio);
        this.alertElement = document.getElementById(idAlert)
    
        // this.inputNombreClass = this.inputNombre.className;
        // this.inputEdadClass = this.inputEdad.className;
        // this.inputDNIClass = this.inputDNI.className;
        // this.inputSexoClass = this.inputSexo.className;
        // this.inputPesoClass = this.inputPeso.className;
        // this.inputAlturaClass = this.inputAltura.className;
        // this.inputAnioClass = this.inputAnio.className; 
    }

    generarDNI()
    {
        let dniGenerado = Math.floor(Math.random()*9) + 1; //solo el primer elemento se elige entre 1 y 9
        for (let i=1; i<8; i++) //geneoro el resto de numeros
        {
            dniGenerado *= 10;
            dniGenerado += Math.floor(Math.random()*10); //cualquier numero entre 0 y 9
        }
        this.inputDNI.value = dniGenerado;
    }

    clearAlert()
    {
        this.alertElement.innerHTML = "";
    }

    alert(message, type) 
    {
        this.alertElement.innerHTML = "";
        let wrapper = document.createElement('div')
        wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">${message} 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`

        this.alertElement.append(wrapper)
    }

    getDatos()
    {
        //validaciones
        let nombre = this.inputNombre.value;
        if (nombre.length<3 || nombre.length>50)
        {
            this.alert('Ingrese un nombre de entre 3 y 50 caracteres','warning');
            this.inputNombre.focus();
            return null;
        }

        let edad = parseInt(this.inputEdad.value);
        if (isNaN(edad) || edad<1 || edad>99)
        {
            this.alert('Ingrese una edad válida entre 1 y 99 años', 'warning');
            this.inputEdad.focus();
            return null;
        }

        let dni = parseInt(this.inputDNI.value);
        if (isNaN(dni) || dni<=999999 || dni>99999999)
        {
            this.alert('Ingrese un DNI válido de 5 o 6 dígitos', 'warning');
            this.inputDNI.focus();
            return null;
        }

        let sexo = this.inputSexo.value;
        if (sexo.length != 1 || (sexo != 'H' && sexo !='M'))
        {
            this.alert('Ingrese solo H o M para sexo', 'warning');
            this.inputSexo.focus();
            return null;
        }

        let peso = parseFloat(this.inputPeso.value);
        if (isNaN(peso) || peso<1 || peso>200)
        {
            this.alert('Ingrese un peso válido entre 1 y 200 kgs', 'warning');
            this.inputPeso.focus();
            return null;
        }

        let altura = parseFloat(this.inputAltura.value);
        if (isNaN(altura) || altura<.5 || altura>2.20)
        {
            this.alert('Ingrese una altura válida entre 0.5 y 2.20 mts', 'warning');
            this.inputAltura.focus();
            return null;
        }

        let anio = parseInt(this.inputAnio.value);
        if (isNaN(anio) || anio<1900 || anio>2022)
        {
            this.alert('Ingrese un año válido entre 1900 y 2022', 'warning');
            this.inputAnio.focus();
            return null;
        }

        //si todas las validaciones están bien, creo el objeto
        return new Persona(nombre, edad, dni, sexo, peso, altura, anio);
    }
}

class Generacion
{
    constructor(nombre, anioDesde, anioHasta, poblacion, circunstanciaHistorica, rasgoCaracteristico)
    {
        this.nombre = nombre;
        this.anioDesde = anioDesde;
        this.anioHasta = anioHasta;
        this.poblacion = poblacion;
        this.circunstanciaHistorica = circunstanciaHistorica;
        this.rasgoCaracteristico = rasgoCaracteristico;
    }

    pertenece(anio)
    {
        if (anio >= this.anioDesde && anio <= this.anioHasta)
            return true;
        else
            return false;
    }

    mostrarDatos()
    {
        document.write(`<table border=1><tr><th>Generación</th><th>Rasgo característico</th></tr>`)
        document.write(`<tr><td>${this.nombre}</td><td>${this.rasgoCaracteristico}</td></tr></table>`);
    }
}

class Persona 
{
    constructor(nombre, edad, DNI, sexo, peso, altura, anio)
    {
        this.nombre = nombre;
        this.edad = edad;
        this.DNI = DNI;
        this.sexo = sexo;
        this.peso = peso;
        this.altura = altura;
        this.anio = anio;
    }

    mostrarGeneracion()
    {
        for (let i=0; i<generaciones.length; i++)
        {
            if (generaciones[i].pertenece(this.anio))
            {
                generaciones[i].mostrarDatos();
                break;
            }
        }
    }

    esMayorDeEdad()
    {
        let resultado = false;
        if (this.edad >=18 )
            resultado = true;
        return resultado;
    }

    mostrarDatos()
    {
        document.write(`<ul>`);
        for (let propiedad in this)
            document.write(`<li>${propiedad}: ${this[propiedad]}</li>`);
        document.write(`</ul>`);
    }
}

let form = new Form("personaNombre", "personaEdad", "personaDNI", "personaSexo", "personaPeso", "personaAltura", "personaAnio", "alertElement");

let generaciones = [];
generaciones.push(new Generacion("Generación Z", 1994, 2010, 7800000, "Expansión masiva de internet", "Irreverencia"));
generaciones.push(new Generacion("Generación Y<br><i>millenials</i>", 1981, 1993, 7200000, "Inicio de la digitalización", "Frustración"));
generaciones.push(new Generacion("Generación X", 1969, 1980, 9300000, "Crisis del 73 y transición Española", "Obsesión por el éxito"));
generaciones.push(new Generacion("Baby Boom", 1949, 1968, 12200000, "Paz y explosión demográfica", "Ambición"));
generaciones.push(new Generacion("<i>Silent Generation</i><br>Los niños de la postguerra", 1930, 1948, 6300000, "Conflictos bélicos", "Austeridad"));

let personas = [];
// personas.push(new Persona("Chechu", 70, 6004033, "M", 58, 1.60, 1933));
// personas.push(new Persona("Carlos", 48, 23157174, "H", 80, 1.72, 1973));
// personas.push(new Persona("Maca", 40, 15615615, "M", 54, 1.68, 1981));
// personas.push(new Persona("Rena", 30, 3332332, "M", 60, 1.67, 1991));
// personas.push(new Persona("Fede", 20, 43344344, "H", 64, 1.64, 2001));
// personas.push(new Persona("Ale", 3, 3232323, "H", 17, 1, 2015));

function dibujarTabla()
{
    let seccionTabla = document.getElementById("seccionTabla");
    seccionTabla.className="container"; //hago visible la tabla
    
    let datosTabla = document.getElementById("datosTabla");
    datosTabla.innerHTML = '';
    personas.forEach(persona => {
        datosTabla.innerHTML += `<tr><td>${persona.nombre}</td><td>${persona.edad}</td><td>${persona.anio}</td></tr>`
    //     persona.mostrarDatos();
    //     persona.mostrarGeneracion();
    //     if (persona.esMayorDeEdad())
    //         document.write('*es mayor de edad<br>');
    //     persona.generarDNI()
    //     document.write('<hr>')
    })
}

function agregarPersona()
{
    form.clearAlert();
    let persona = form.getDatos();
    if (persona != null)
    {
        personas.push(persona);
        dibujarTabla();
    }
}

function generarDNI()
{
    form.generarDNI()
}