function generarCasillas(n) {
    const casillas = document.getElementById('info-actividad');
    casillas.innerHTML = '';

    if(n == 0) {
        return;
    }

    for(let i = 1; i <= n; i++) {                                   //basicamente es un bucle que crea una variable i que empieza en 1, y que cada vez que se repite aumenta en 1 (por eso el i++), el bucle para cuando i supera a n
        const div = document.createElement('div');

        const titulo = document.createElement('h3');
        titulo.textContent = `Actividad ${i}`;

        const tipoLabel = document.createElement('label');
        tipoLabel.htmlFor = `tipo-actividad-${i}`;
        tipoLabel.textContent = 'Su actividad es del tipo:';

        const select = document.createElement('select');
        select.id = `tipo-actividad-${i}`;
        select.name = `tipo-actividad-${i}`;

        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = '-- Seleccione --';

        const opcionDeportiva = document.createElement('option');
        opcionDeportiva.value = 'deporte';
        opcionDeportiva.textContent = 'Deporte';

        const opcionArtistica = document.createElement('option');
        opcionArtistica.value = 'arte';
        opcionArtistica.textContent = 'arte';

        const opcionTecnologica = document.createElement('option');
        opcionTecnologica.value = 'tecnología';
        opcionTecnologica.textContent = 'Tecnología';

        const opcionSocial = document.createElement('option');
        opcionSocial.value = 'social';
        opcionSocial.textContent = 'Social';

        const opcionRecreacion = document.createElement('option');
        opcionRecreacion.value = 'recreación';
        opcionRecreacion.textContent = 'Recreación';

        const opcionOtro = document.createElement('option');
        opcionOtro.value = 'otra';
        opcionOtro.textContent = 'Otra';

        const inputOtroDiv = document.createElement('div')
        inputOtroDiv.style.display = 'none'

        const inputOtro = document.createElement('input');
        inputOtro.type = 'text';
        inputOtro.id = `input-otro-${i}`
        inputOtro.name = `input-otro-${i}`
        inputOtro.placeholder = 'Escriba tipo de actividad'

        const nombreActividadLabel = document.createElement('label')
        nombreActividadLabel.htmlFor = `nombre-actividad-${i}`
        nombreActividadLabel.textContent = 'Indique el nombre de su actividad'
        
        const nombreActividadInput = document.createElement('input')
        nombreActividadInput.id = `nombre-actividad-${i}`
        nombreActividadInput.name = `nombre-actividad-${i}`
        nombreActividadInput.placeholder = 'Escriba su actividad aqui'

        const descripcionLabel = document.createElement('label')
        descripcionLabel.htmlFor = `descripcion-actividad-${i}`
        descripcionLabel.textContent = 'Agrege una breve descripcion de la actividad'

        const descripcionInput = document.createElement('input')
        descripcionInput.type = 'text'
        descripcionInput.id = `descripcion-actividad-${i}`
        descripcionInput.name = `descripcion-actividad-${i}`

        div.appendChild(titulo)
        div.appendChild(tipoLabel)
        div.appendChild(select)
        select.appendChild(placeholder)
        select.appendChild(opcionDeportiva)
        select.appendChild(opcionArtistica)
        select.appendChild(opcionTecnologica)
        select.appendChild(opcionSocial)
        select.appendChild(opcionRecreacion)
        select.appendChild(opcionOtro)
        inputOtroDiv.appendChild(inputOtro)
        div.appendChild(inputOtroDiv)
        div.appendChild(nombreActividadLabel)
        div.appendChild(nombreActividadInput)
        div.appendChild(descripcionLabel)
        div.appendChild(descripcionInput)

        casillas.appendChild(div)

        //Aqui empieza el horario

        const horarioDiv = document.createElement('div')

        const diaLabel = document.createElement('label')
        diaLabel.htmlFor = `dia-actividad-${i}`
        diaLabel.textContent = 'Indique el dia que realiza la actividad (sin tilde)'
        
        const diaInput = document.createElement('input')
        diaInput.type = 'text'
        diaInput.id = `dia-actividad-${i}`
        diaInput.name = `dia-actividad-${i}`
        diaInput.placeholder = 'Escriba aqui el dia'

        const horaInicioLabel = document.createElement('label')
        horaInicioLabel.htmlFor = `hora-inicio-actividad-${i}`
        horaInicioLabel.textContent = 'Indique la hora inicial a la que realiza la actividad'

        const horaInicioInput = document.createElement('input')
        horaInicioInput.type = 'time'
        horaInicioInput.id = `hora-inicio-actividad-${i}`
        horaInicioInput.name = `hora-inicio-actividad-${i}`

        const duracionLabel = document.createElement('label')
        duracionLabel.htmlFor = `duracion-actividad-${i}`
        duracionLabel.textContent = 'Indique por cuantos minutos realiza la actividad'

        const duracionInput = document.createElement('input')
        duracionInput.type = 'number'
        duracionInput.id = `duracion-actividad-${i}`
        duracionInput.name = `duracion-actividad-${i}`

        

        horarioDiv.appendChild(diaLabel)
        horarioDiv.appendChild(diaInput)
        horarioDiv.appendChild(horaInicioLabel)
        horarioDiv.appendChild(horaInicioInput)
        horarioDiv.appendChild(duracionLabel)
        horarioDiv.appendChild(duracionInput)        

        casillas.appendChild(horarioDiv)
        
        select.addEventListener('change', function() {
            if(this.value == 'otro') {
                inputOtroDiv.style.display = 'block';
            } else {
                inputOtroDiv.style.display = 'none';
                inputOtro.value = ''
            }
        })
    }
}

const numeroActividades = document.getElementById('numero-actividad');
numeroActividades.addEventListener('change', function() {
    const valor = parseInt(this.value);
    generarCasillas(valor)
});

generarCasillas(0)