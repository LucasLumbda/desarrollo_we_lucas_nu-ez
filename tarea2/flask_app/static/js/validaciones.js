const validarNombre = (nombre) => {                             //Lo ocupare para el nombre y nombre de la actividad
    if(!nombre) return false;
    let lengthValid = nombre.trim().length >= 3;
    return lengthValid;    
}

const validarEmail = (mail) => {
    if (!mail) return false;
    let lengthValid = mail.length > 15;

    let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let formatValid = re.test(mail);

    return lengthValid && formatValid;
};

const validarCelular = (celular) => {
    if (!celular) return false;
    // validación de longitud
    let lengthValid = celular.length >= 8;

    let re = /^[0-9]+$/;
    let formatValid = re.test(celular);

    return lengthValid && formatValid;
};

const validarArchivos = (files) => {
    if (!files) return false;

    let lengthValid = 1 <= files.length && files.length <= 3;                         // hace que tenga que seleccionar entre 1 y 3 archivos

    let typeValid = true;

    for (const file of files) {                                                       // valido que los archivos sean imagenes o videos
        let fileFamily = file.type.split("/")[0];
        typeValid &&= fileFamily == "image" || fileFamily == 'video' ;
    }

    return lengthValid && typeValid;
};

const validarSelect = (select) => {                             //Lo ocupare para todos los select
    if(!select || select === '') return false;
    return true
}

const validarTipoActividadOtro = (actividad) => {
    if(!actividad) return false;
    let lengthValid = actividad.trim().length >= 3;

    let re = /^[a-zA-Z]+$/
    let formatValid = re.test(actividad)

    return lengthValid && formatValid
}

const validarDia = (dia) => {
    if (!dia) return false;
    const diasValidos = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO']
    
    let formatValid = diasValidos.includes(dia.toUpperCase().trim())

    return formatValid
}

const validarEnlace = (enlace) => {
    if(!enlace) return false

    let re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    let formatValid = re.test(enlace)

    return formatValid
}

let form = document.forms['form-actividad'];

const validarForm = (e) => {
    let form = document.forms['form-actividad'];
    let name = form['nombre-apellido'].value
    let celular = form['celular'].value
    let email = form['mail'].value
    let tipoUsuario = form['tipo-usuario'].value
    let nActividad = parseInt(form['numero-actividad'].value)
    let files = form['archivo-actividad'].files
    let enlace = form['enlace-actividad'].value

    let listaActividades = []
    for(let i = 1; i <= nActividad; i++) {
        let actividad = {
            tipoActividad: form[`tipo-actividad-${i}`].value,
            nombreActividad: form[`nombre-actividad-${i}`].value,
            diaActividad: form[`dia-actividad-${i}`].value,
            horaInicio: form[`hora-inicio-actividad-${i}`].value,
            duracion: form[`duracion-actividad-${i}`].value,
            inputOtro: form[`input-otro-${i}`].value
        }
        listaActividades.push(actividad)
    }

    let invalidInputs = [];
    let isValid = true;
    const setInvalidInput = (inputName) => {
        invalidInputs.push(inputName);
        isValid &&= false;
    };

    if (!validarNombre(name)) {
        setInvalidInput('Nombre')
    }
    if (!validarCelular(celular)) {
        setInvalidInput('Celular')
    }
    if (!validarEmail(email)) {
        setInvalidInput('Email')
    }
    if (!validarSelect(tipoUsuario)) {
        setInvalidInput('Tipo de Usuario')
    }
    if (!validarArchivos(files)) {
        setInvalidInput('Archivos')
    }
    if (!validarEnlace(enlace)) {
        setInvalidInput('Enlace')
    }
    for(let i = 0; i <= nActividad-1; i++) {
        if (!validarSelect(listaActividades[i].tipoActividad)) {
            setInvalidInput(`Tipo de Actividad ${i+1}`)
        }
        if (!validarNombre(listaActividades[i].nombreActividad)) {
            setInvalidInput(`Nombre de actividad ${i+1}`)
        }
        if (!validarDia(listaActividades[i].diaActividad)) {
            setInvalidInput(`Dia de Actividad ${i+1}`)
        }
        if (!validarTipoActividadOtro(listaActividades[i].inputOtro) && listaActividades[i].tipoActividad == 'otro') {
            setInvalidInput(`Especifique tipo de actividad ${i+1}`)
        }
    }

    let validationBox = document.getElementById("val-box");
    let validationMessageElem = document.getElementById("val-msg");
    let validationListElem = document.getElementById("val-list");
    let formContainer = document.querySelector(".main-container");
    
    if (!isValid) {
        e.preventDefault()
        console.log('formulario invalido')
        validationListElem.textContent = "";
        // agregar elementos inválidos al elemento val-list.
        for (input of invalidInputs) {
          let listElement = document.createElement("li");
          listElement.innerText = input;
          validationListElem.append(listElement);
        }
        // establecer val-msg
        validationMessageElem.innerText = "Los siguientes campos son inválidos:";

        // aplicar estilos de error
        validationBox.style.backgroundColor = "#ffdddd";
        validationBox.style.borderLeftColor = "#f44336";

        // hacer visible el mensaje de validación
        validationBox.hidden = false;

        const header = document.querySelector('header');
        if (header) header.style.display = '';

        const nav = document.querySelector('nav');
        if (nav) nav.style.display = ''; 
    } else {
        //form.style.display = "none";
        //const header = document.querySelector('header');
        //if (header) header.style.display = 'none';       
        //const nav = document.querySelector('nav');
        //if (nav) nav.style.display = 'none'; 
//
        //validationMessageElem.innerText = "¡Formulario válido! ¿Deseas enviarlo o volver?";
        //validationListElem.textContent = "";
//
        //validationBox.style.backgroundColor = "#ddffdd";
        //validationBox.style.borderLeftColor = "#4CAF50";
//
        //let submitButton = document.createElement("button");
        //submitButton.innerText = "Enviar";
        //submitButton.style.marginRight = "10px";
        //submitButton.addEventListener("click", () => {
        //    formElement.submit()
        //});
//
        //let backButton = document.createElement("button");
        //backButton.innerText = "Volver";
        //backButton.addEventListener("click", () => {
        //  // Mostrar el formulario nuevamente
        //  form.style.display = "block";
        //  validationBox.hidden = true;
        //});
//
        //validationListElem.appendChild(submitButton);
        //validationListElem.appendChild(backButton);
//
        //// hacer visible el mensaje de validación
        //validationBox.hidden = false;

        console.log('formulario valido')

        validationMessageElem.innerText = "Enviando formulario...";
        validationBox.style.backgroundColor = "#ddffdd";
        validationBox.style.borderLeftColor = "#4CAF50";
        validationBox.hidden = false;

      }
};



//let submitBtn = document.getElementById("submit-btn");
//submitBtn.addEventListener("click", validarForm);

document.addEventListener('DOMContentLoaded', function() {
    let formElement = document.getElementById("form-actividad");
    if (formElement) {
        formElement.addEventListener("submit", function(e) {
            // Pasamos 'e' para poder detener el envío si hay errores
            validarForm(e); 
        });
    }
});