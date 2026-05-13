from flask import Flask, render_template, url_for, request, redirect 
from utils.validations import validarMiembro, validarActividad
from database import db
from datetime import date
import os

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = 's3cr3t_k3y'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

class actividad:
    def __init__(self, tipo, nombre, dia, horaInicio, duracion, inputOtro, descripcion):
        self.tipo = tipo
        self.nombre = nombre
        self.dia = dia
        self.horaInicio = horaInicio
        self.duracion = duracion
        self.inputOtro = inputOtro
        self.descripcion = descripcion

@app.route('/', methods=['GET'])
def index():
    return render_template('portada/index.html')

@app.route('/register', methods=['GET', 'POST'])                                    #Buscar como poner en la base de datos lo que extraigo del form
def register():
#    print("=" * 50)
#    print("DATOS RECIBIDOS DEL FORMULARIO:")
#    for key, value in request.form.items():
#        print(f"  {key}: {value}")
#    print("=" * 50)                                                                     #Y poder hacer que muestre el mensaje de error correspondiente a lo que tiene malo
    if request.method == 'POST':                                                    #Mirar app.py aux 4
        nombre_apellido = request.form.get('nombre-apellido')                       #Ver si es necesario añadir el mensaje o simplemente dejarselo al js y aqui añadir las weas al js
        celular = request.form.get('celular')
        mail = request.form.get('mail')
        fecha_registro = date.today()
        comuna_id = request.form.get('comuna')

        nActividades = int(request.form.get('numero-actividad'))
        listaActividades = []
        validacionActividades = True

        for i in range(1, nActividades + 1):
            tipoActividad = request.form.get(f'tipo-actividad-{i}')
            nombreActividad = request.form.get(f'nombre-actividad-{i}')
            diaActividad = request.form.get(f'dia-actividad-{i}')
            horaInicio = request.form.get(f'hora-inicio-actividad-{i}')
            duracion = request.form.get(f'duracion-actividad-{i}')
            inputOtro = request.form.get(f'input-otro-{i}')
            descripcion = request.form.get(f'descripcion-actividad-{i}')


            nuevaActividad = actividad(tipoActividad, nombreActividad, diaActividad, horaInicio, duracion, inputOtro, descripcion)
            listaActividades.append(nuevaActividad)

        for act in listaActividades:
            validacionActividades = validacionActividades and validarActividad(act)

        if validarMiembro(nombre_apellido, mail, celular) and validacionActividades:
            db.crearMiembro(nombre_apellido, celular, mail, fecha_registro, comuna_id)
            id = db.get_id_by_nombre(nombre_apellido)

            for act in listaActividades:
                db.guardarActividad(id, act.dia, act.horaInicio, act.duracion, act.tipo, act.nombre, act.descripcion)

        return render_template('auth/register.html', regiones=db.getRegiones())

    return render_template('auth/register.html', regiones=db.getRegiones())
    
@app.route('/lista')
def lista():
    return render_template('datos/lista.html')

@app.route('/estadisticas')
def estadisticas():
    return render_template('datos/estadisticas.html')

#@app.route('/debug-regiones')
#def debug_regiones():
#    session = db.SessionLocal()
#    regiones = session.query(db.Region).all()
#    session.close()
#    
#    resultado = "<h2>Regiones en BD:</h2><ul>"
#    for r in regiones:
#        resultado += f"<li>ID: {r.id} - Nombre: {r.nombre}</li>"
#    resultado += "</ul>"
#    return resultado

if __name__ == '__main__':                      #Esto hace que al escribir en la consola python app.py se ejecute la aplicacion
    app.run(debug=True)