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

        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = '-- Seleccione --';

        const opcionDeportiva = document.createElement('option');
        opcionDeportiva.value = 'deportiva';
        opcionDeportiva.textContent = 'Deportiva';

        const opcionArtistica = document.createElement('option');
        opcionArtistica.value = 'artistica';
        opcionArtistica.textContent = 'Artistica';

        const opcionTecnologica = document.createElement('option');
        opcionTecnologica.value = 'tecnologica';
        opcionTecnologica.textContent = 'Tecnologica';

        const opcionSocial = document.createElement('option');
        opcionSocial.value = 'social';
        opcionSocial.textContent = 'Social';

        const opcionOtro = document.createElement('option');
        opcionOtro.value = 'otro';
        opcionOtro.textContent = 'Otro';

        const inputOtroDiv = document.createElement('div')
        inputOtroDiv.style.display = 'none'

        const inputOtro = document.createElement('input');
        inputOtro.type = 'text';
        inputOtro.id = `input-otro-${i}`
        inputOtro.placeholder = 'Escriba tipo de actividad'

        const nombreActividadLabel = document.createElement('label')
        nombreActividadLabel.htmlFor = `nombre-actividad-${i}`
        nombreActividadLabel.textContent = 'Indique el nombre de su actividad'
        
        const nombreActividadInput = document.createElement('input')
        nombreActividadInput.id = `nombre-actividad-${i}`
        nombreActividadInput.placeholder = 'Escriba su actividad aqui'

        div.appendChild(titulo)
        div.appendChild(tipoLabel)
        div.appendChild(select)
        select.appendChild(placeholder)
        select.appendChild(opcionDeportiva)
        select.appendChild(opcionArtistica)
        select.appendChild(opcionTecnologica)
        select.appendChild(opcionSocial)
        select.appendChild(opcionOtro)
        inputOtroDiv.appendChild(inputOtro)
        div.appendChild(inputOtroDiv)
        div.appendChild(nombreActividadLabel)
        div.appendChild(nombreActividadInput)

        casillas.appendChild(div)

        //Aqui empieza el horario

        const horarioDiv = document.createElement('div')

        const diaLabel = document.createElement('label')
        diaLabel.htmlFor = `dia-actividad-${i}`
        diaLabel.textContent = 'Indique el dia que realiza la actividad (sin tilde)'
        
        const diaInput = document.createElement('input')
        diaInput.type = 'text'
        diaInput.id = `dia-actividad-${i}`
        diaInput.placeholder = 'Escriba aqui el dia'

        const horaInicioLabel = document.createElement('label')
        horaInicioLabel.htmlFor = `hora-inicio-actividad-${i}`
        horaInicioLabel.textContent = 'Indique la hora inicial a la que realiza la actividad'

        const horaInicioInput = document.createElement('input')
        horaInicioInput.type = 'time'
        horaInicioInput.id = `hora-inicio-actividad-${i}`

        const horaFinalLabel = document.createElement('label')
        horaFinalLabel.htmlFor = `hora-final-actividad-${i}`
        horaFinalLabel.textContent = 'Indique la hora a la que termina de realizar la actividad'

        const horaFinalInput = document.createElement('input')
        horaFinalInput.type = 'time'
        horaFinalInput.id = `hora-final-actividad-${i}`

        horarioDiv.appendChild(diaLabel)
        horarioDiv.appendChild(diaInput)
        horarioDiv.appendChild(horaInicioLabel)
        horarioDiv.appendChild(horaInicioInput)
        horarioDiv.appendChild(horaFinalLabel)
        horarioDiv.appendChild(horaFinalInput)        

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