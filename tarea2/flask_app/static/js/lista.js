const datos = [
    {nombre: 'Deigo Dieguini', mail: 'dieguinitvz@gmail.com', celular: '932155064', ocupacion: 'Funcionario', tipoActividad: 'Deporte', nombreActividad: 'Gimnasio'}, 
    {nombre: 'Juan Jose', mail: 'juanjose@gmail.com', celular: '945681234', ocupacion: 'Academico', tipoActividad: 'Social', nombreActividad: 'Ir a tocatas'}, 
    {nombre: 'Jose Miguel Cornejo', mail: 'elzepe@quetiapina.cl', celular: '945678521', ocupacion: 'Estudiante de Pregrado', tipoActividad: 'Social', nombreActividad: 'Tomar'}, 
    {nombre: 'Matias Vergara', mail: 'mativ@coito.com', celular: '123456789', ocupacion: 'Estudiante de Posgrado', tipoActividad: 'Deporte', nombreActividad: 'Gustos exoticos'}, 
    {nombre: 'Moreno Mateins', mail: 'moreno@mateins.cl', celular: '654328456', ocupacion: 'Academico', tipoActividad: 'Deportiva', nombreActividad:'Correr'}, 
]

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
        celdaMail.textContent = persona.mail

        const celdaCelular = document.createElement('td')
        celdaCelular.textContent = persona.celular

        const celdaOcupacion = document.createElement('td')
        celdaOcupacion.textContent = persona.ocupacion
        
        const celdaTipoActividad = document.createElement('td')
        celdaTipoActividad.textContent = persona.tipoActividad

        const celdaNombreActividad = document.createElement('td')
        celdaNombreActividad.textContent = persona.nombreActividad

        fila.appendChild(celdaNombre)
        fila.appendChild(celdaMail)
        fila.appendChild(celdaCelular)
        fila.appendChild(celdaOcupacion)
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