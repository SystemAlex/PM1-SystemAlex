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
        const indice = this.actividades.findIndex(actividad => actividad.id === id);
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
            Activides.agregarActividad(actividad.value, descripcion.value, imagen.value);

            const galeria = document.getElementById("actividadesGaleria");

            const el_item = '<div class="galeria_item"><figure><span>Imagen</span><img src="https://picsum.photos/id/102/800/600" alt="Image #2"><figcaption>Image #2</figcaption></figure></div>'

            galeria.appendChild(el_item);

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

}
