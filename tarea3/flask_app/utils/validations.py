import re

def validarNombre(nombre):
    if not nombre:
        return False
    lengthValid = len(nombre.strip()) >= 3;
    return lengthValid

def validarEmail(mail):
    if not mail:
        return False
    lengthValid = len(mail) > 15

    patron =  r'^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
    formatValid = re.match(patron, mail)

    return lengthValid and formatValid

def validarCelular(celular):
    if not celular:
        return False
    lengthValid = len(celular) >= 8 

    patron = r'^[0-9]+$'
    formatValid = re.match(patron, celular)

    return lengthValid and formatValid

def validarArchivos(files):
    if not files:
        return False
    
    lengthValid = 1 <= len(files) <= 3

    type_valid = True
    for file in files:
        tipo_archivo = file.type.split('/')[0]
        type_valid = type_valid and (tipo_archivo == 'image' or tipo_archivo == 'video')

    return lengthValid and type_valid

def validarSelect(select):
    if not select or select == '':
        return False
    return True

def validarTipoActividadOtro(actividad):
    if not actividad:
        return False
    lengthValid = len(actividad.strip()) >= 3
    
    patron = r'/^[a-zA-Z]+$/'
    formatValid = bool(re.match(patron, actividad))

    return lengthValid and formatValid

def validarDia(dia):
    if not dia:
        return False
    diasValidos = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO']

    formatValid = dia.upper().strip() in diasValidos

    return formatValid

def validarEnlace(enlace):
    if not enlace:
        return False
    
    patron = r'/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/'
    formatValid = bool(re.match(patron, enlace))

    return formatValid

def validarDuracion(duracion):
    if not duracion:
        return False
    
    formatValid = isinstance(duracion, int) or isinstance(duracion, float)

    return formatValid

def validarMiembro(nombre, mail, celular):
    return validarNombre(nombre) and validarEmail(mail) and validarCelular(celular)

def validarActividad(actividad):
    return validarSelect(actividad.tipo) and validarNombre(actividad.nombre) and validarDia(actividad.dia) and validarDuracion(actividad.duracion)