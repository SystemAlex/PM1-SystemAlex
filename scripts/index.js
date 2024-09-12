class la_actividad {
    constructor(id, actividad, descripcion, imagen) {
        this.id = id;
        this.actividad = actividad;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
}

class las_actividades {
    constructor() {
        this.actividades = [];
        this.id = 0;
    }

    verActivicades() {
        return this.actividades;
    }

    agregarActividad(actividad, descripcion, imagen) {
        this.actividades.push(new la_actividad(this.id, actividad, descripcion, imagen));
        this.id++;
    }

    eliminarActividad(id) {
        const indice = this.actividades.findIndex(actividad => actividad.id === (id * 1));
        if (indice !== -1) {
            this.actividades.splice(indice, 1);
        }
    }
}

const Activides = new las_actividades();

const agregaClick = () => {
    const los_campos = document.getElementsByClassName("campo");
    // Verifica que todos los campos tengan valor
    let isOk = Array.from(los_campos).every(campo => campo.value.trim() !== '');
    if (isOk) {
        try {
            // Verifica si el enlace a la imagen es valido
            new URL(los_campos.imagen.value);

            const { actividad, descripcion, imagen } = los_campos;

            const galeria = document.getElementById("actividadesGaleria");

            if (galeria.childElementCount === 0) {
                galeria.innerHTML = "";
            }

            const nuevoDiv = document.createElement("div");
            nuevoDiv.id = "activ" + Activides.id;
            nuevoDiv.classList.add("galeria_item");
            const nuevaFigure = document.createElement("figure");
            const titulo = document.createElement("span");
            titulo.innerHTML = actividad.value;
            const delButton = document.createElement("button");
            delButton.id = "delActiv" + Activides.id;
            delButton.classList.add("delButton");
            delButton.title = "Eliminar Actividad";
            delButton.addEventListener("click", eliminarClick);
            const delImg = document.createElement("img");
            delImg.src = "assets/delete-button.svg";
            delButton.appendChild(delImg);
            titulo.appendChild(delButton);
            nuevaFigure.appendChild(titulo);
            const laImagen = document.createElement("img");
            laImagen.alt = actividad.value;
            laImagen.src = imagen.value;
            nuevaFigure.appendChild(laImagen);
            const desc = document.createElement("figcaption");
            desc.innerHTML = descripcion.value;
            nuevaFigure.appendChild(desc);
            nuevoDiv.appendChild(nuevaFigure);

            //const el_item = '<div class=""><figure><span>Imagen</span><img src="https://picsum.photos/id/102/800/600" alt="Image #2"><figcaption>Image #2</figcaption></figure></div>'

            galeria.appendChild(nuevoDiv);

            Activides.agregarActividad(actividad.value, descripcion.value, imagen.value);

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
