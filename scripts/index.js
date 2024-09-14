class Activity {
    constructor(id, title, description, imagen) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor() {
        this.activities = [];
        this.id = 0;
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(title, description, imgUrl) {
        this.activities.push(new Activity(this.id, title, description, imgUrl));
        this.id++;
    }

    deleteActivity(id) {
        const indice = this.activities.findIndex(title => title.id === (id * 1));
        if (indice !== -1) {
            this.activities.splice(indice, 1);
        }
    }
}

const Activides = new Repository();

// Actividad a HTML
function actividadHTML(Activity) {
    const { id, title, description, imgUrl } = Activity;

    const nuevoDiv = document.createElement("div");
    nuevoDiv.id = "activ" + id;
    nuevoDiv.classList.add("galeria_item");

    const nuevaFigure = document.createElement("figure");
    const titulo = document.createElement("span");
    titulo.innerHTML = title;
    const delButton = document.createElement("button");
    delButton.id = "delActiv" + id;
    delButton.classList.add("delButton");
    delButton.title = "Eliminar Actividad " + title;
    delButton.addEventListener("click", eliminarClick);
    const delImg = document.createElement("img");
    delImg.src = "assets/delete-button.svg";
    delButton.appendChild(delImg);
    titulo.appendChild(delButton);
    nuevaFigure.appendChild(titulo);
    const laImagen = document.createElement("img");
    laImagen.alt = title;
    laImagen.src = imgUrl;
    nuevaFigure.appendChild(laImagen);
    const desc = document.createElement("figcaption");
    desc.innerHTML = description;
    nuevaFigure.appendChild(desc);
    nuevoDiv.appendChild(nuevaFigure);

    return nuevoDiv;
}

// Todas las actividades a HTML
function targetasHTML() {
    const galeria = document.getElementById("actividadesGaleria");
    galeria.innerHTML = "";

    const lasActividades = Activides.getAllActivities();

    const lasTargetas = lasActividades.map(actividadHTML);

    lasTargetas.forEach(elemento => galeria.appendChild(elemento));
}

function agregaClick() {
    const los_campos = document.getElementsByClassName("campo");
    // Verifica que todos los campos tengan valor
    let isOk = Array.from(los_campos).every(campo => campo.value.trim() !== '');
    if (isOk) {
        try {
            // Verifica si el enlace a la imgUrl es valido
            new URL(los_campos.imgUrl.value);

            const { title, description, imgUrl } = los_campos;

            Activides.createActivity(title.value, description.value, imgUrl.value);

            targetasHTML();

            Array.from(los_campos).forEach(campo => campo.value = "");
        } catch (_) {
            alert("Debe ingresar un enlace valido");
            los_campos.imgUrl.focus();
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
        Activides.deleteActivity(aElimiId);

        const galeria = document.getElementById("actividadesGaleria");
        if (galeria.childElementCount === 0) {
            galeria.innerHTML = "No Hay Actividades";
        }
    }
}

module.exports = { Activity, Repository };