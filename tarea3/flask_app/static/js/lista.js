const datos = listaUsuarios;
console.log(datos)

let datosActuales = [...datos]

const ordenador = (columna, direccion) => {
    let datosOrdenados = [...datosActuales]

    datosOrdenados.sort((a, b) => {
        let valorA = a[columna]
        let valorB = b[columna]

        let numA = parseInt(valorA)
        let numB = parseInt(valorB)

    if (columna === 'celular') {
        if (direccion == 'asc') {
            return numA - numB
        } else {
            return numA - numB
        }
    } else {
        valorA = String(valorA).toLowerCase()
        valorB = String(valorB).toLowerCase()

        if (direccion == 'asc') {
            if (valorA < valorB) return -1;
            if (valorA > valorB) return 1;
            return 0;
        } else {
            if (valorA > valorB) return -1
            if (valorA < valorB) return 1
            return 0
        }
    }
    });

    datosActuales = datosOrdenados;
    crearTabla();
};

const crearTabla = () => {
    const tbody = document.getElementById('body-tabla')
    tbody.innerHTML = '';

    datosActuales.forEach(persona => {
        const fila = document.createElement('tr')

        const celdaNombre = document.createElement('td')
        celdaNombre.textContent = persona.nombre

        const celdaMail = document.createElement('td')
        celdaMail.textContent = persona.email

        const celdaCelular = document.createElement('td')
        celdaCelular.textContent = persona.telefono
        
        const celdaTipoActividad = document.createElement('td')
        celdaTipoActividad.textContent = persona.tipoActividad

        const celdaNombreActividad = document.createElement('td')
        celdaNombreActividad.textContent = persona.nombreActividad

        fila.appendChild(celdaNombre)
        fila.appendChild(celdaMail)
        fila.appendChild(celdaCelular)
        fila.appendChild(celdaTipoActividad)
        fila.appendChild(celdaNombreActividad)

        tbody.appendChild(fila)
    })
}

const ordenar = () => {
    const columna = document.getElementById('ordenar-por').value
    const direccion = document.getElementById('direccion-orden').value

    columnaActual = columna
    direccionActual = direccion

    ordenador(columnaActual, direccionActual)
}

document.addEventListener('DOMContentLoaded', () => {
    crearTabla()

    const btnOrdenar = document.getElementById('btn-ordenar')
    if (btnOrdenar) {
        btnOrdenar.addEventListener('click', ordenar)
    }
})