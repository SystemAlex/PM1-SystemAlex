class Activity {
    constructor(id, actividad, descripcion, imagen) {
        this.id = id;
        this.actividad = actividad;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
}

class Repository {
    constructor() {
        this.actividades = [];
        this.id = 0;
    }

    verActivicades() {
        return this.actividades;
    }

    agregarActividad(actividad, descripcion, imagen) {
        this.actividades.push(new Activity(this.id, actividad, descripcion, imagen));
        this.id++;
    }

    eliminarActividad(id) {
        const indice = this.actividades.findIndex(actividad => actividad.id === (id * 1));
        if (indice !== -1) {
            this.actividades.splice(indice, 1);
        }
    }
}

const Activides = new Repository();

// Actividad a HTML
function actividadHTML(Activity) {
    const { id, actividad, descripcion, imagen } = Activity;

    const nuevoDiv = document.createElement("div");
    nuevoDiv.id = "activ" + id;
    nuevoDiv.classList.add("galeria_item");

    const nuevaFigure = document.createElement("figure");
    const titulo = document.createElement("span");
    titulo.innerHTML = actividad;
    const delButton = document.createElement("button");
    delButton.id = "delActiv" + id;
    delButton.classList.add("delButton");
    delButton.title = "Eliminar Actividad " + actividad;
    delButton.addEventListener("click", eliminarClick);
    const delImg = document.createElement("img");
    delImg.src = "assets/delete-button.svg";
    delButton.appendChild(delImg);
    titulo.appendChild(delButton);
    nuevaFigure.appendChild(titulo);
    const laImagen = document.createElement("img");
    laImagen.alt = actividad;
    laImagen.src = imagen;
    nuevaFigure.appendChild(laImagen);
    const desc = document.createElement("figcaption");
    desc.innerHTML = descripcion;
    nuevaFigure.appendChild(desc);
    nuevoDiv.appendChild(nuevaFigure);

    return nuevoDiv;
}

// Todas las actividades a HTML
function targetasHTML() {
    const galeria = document.getElementById("actividadesGaleria");
    galeria.innerHTML = "";

    const lasActividades = Activides.verActivicades();

    const lasTargetas = lasActividades.map(actividadHTML);

    lasTargetas.forEach(elemento => galeria.appendChild(elemento));
}

function agregaClick() {
    const los_campos = document.getElementsByClassName("campo");
    // Verifica que todos los campos tengan valor
    let isOk = Array.from(los_campos).every(campo => campo.value.trim() !== '');
    if (isOk) {
        try {
            // Verifica si el enlace a la imagen es valido
            new URL(los_campos.imagen.value);

            const { actividad, descripcion, imagen } = los_campos;

            Activides.agregarActividad(actividad.value, descripcion.value, imagen.value);

            targetasHTML();

            Array.from(los_campos).forEach(campo => campo.value = "");
        } catch (_) {
            alert("Debe ingresar un enlace valido");
            los_campos.imagen.focus();
        }
    } else {
        alert("Debe ingresar todos los campos");
        let tiempo = undefined;
        Array.from(los_campos).forEach(campo => {
            if (campo.value.trim() === '' && tiempo === undefined) {
                tiempo = setInterval(campo.focus(), 100);
            }
        });
    }
}

document.getElementById("agregar").addEventListener("click", agregaClick);

const eliminarClick = (event) => {
    const aElimi = event.target.id.replace("delActiv", "activ");
    const aElimiId = aElimi.replace("activ", "");
    let eliminar = confirm("Confirma Eliminar la Actividad?");
    if (eliminar) {
        document.getElementById(aElimi).remove();
        Activides.eliminarActividad(aElimiId);

        const galeria = document.getElementById("actividadesGaleria");
        if (galeria.childElementCount === 0) {
            galeria.innerHTML = "No Hay Actividades";
        }
    }
}
