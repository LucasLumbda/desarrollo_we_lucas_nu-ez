from flask import Flask, render_template, url_for, request, redirect, jsonify 
from utils.validations import validarMiembro, validarActividad
from database import db
from datetime import date
import os
import json

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

# ====================================================================
# Buscar como poner lo del form en la base de datos
# ====================================================================

@app.route('/register', methods=['GET', 'POST'])                                    
def register():
    if request.method == 'POST':
        #print('LLEGASTE AL POST')
        nombre_apellido = request.form.get('nombre-apellido')
        #print(nombre_apellido)
        celular = request.form.get('celular')
        #print(celular)
        mail = request.form.get('mail')
        #print(mail)
        fecha_registro = date.today()
        #print(fecha_registro)
        comuna_id = request.form.get('comuna')
        #print(comuna_id)

        nActividades = int(request.form.get('numero-actividad'))
        listaActividades = []
        #print(listaActividades)
        validacionActividades = True

        for i in range(1, nActividades + 1):
            tipoActividad = request.form.get(f'tipo-actividad-{i}')
            nombreActividad = request.form.get(f'nombre-actividad-{i}')
            diaActividad = request.form.get(f'dia-actividad-{i}')
            horaInicio = request.form.get(f'hora-inicio-actividad-{i}')
            duracion = float(request.form.get(f'duracion-actividad-{i}'))
            inputOtro = request.form.get(f'input-otro-{i}')
            descripcion = request.form.get(f'descripcion-actividad-{i}')

            print(tipoActividad, type(tipoActividad))
        #    print(tipoActividad, nombreActividad, diaActividad, horaInicio, duracion, inputOtro, descripcion)
        #    print(type(duracion))

            nuevaActividad = actividad(tipoActividad, nombreActividad, diaActividad, horaInicio, duracion, inputOtro, descripcion)
            listaActividades.append(nuevaActividad)

        #    print(listaActividades)

        for act in listaActividades:
            validacionActividades = validacionActividades and validarActividad(act)

        #print(validarMiembro(nombre_apellido, mail, celular), validacionActividades)
        if validarMiembro(nombre_apellido, mail, celular) and validacionActividades:
            db.crearMiembro(nombre_apellido, celular, mail, fecha_registro, comuna_id)
            id = db.get_id_by_nombre(nombre_apellido)

            for act in listaActividades:
                db.guardarActividad(id, act.dia, act.horaInicio, act.duracion, act.tipo, act.nombre, act.descripcion)

        return render_template('auth/register.html', regiones=db.getRegiones())

    return render_template('auth/register.html', regiones=db.getRegiones())
    
@app.route('/lista', methods=['GET'])
def lista():
    listaMiembrosDB = db.getMiembros()
    listaMiembros = []
    for miembro in listaMiembrosDB:
        actividad = db.get_actividad_by_miembro_id(miembro.id)
        if actividad: 
            listaMiembros.append({
                'id': miembro.id,
                'nombre': miembro.nombre,
                'telefono': miembro.telefono,
                'email': miembro.email,
                'tipoActividad': actividad.tipo,
                'nombreActividad': actividad.nombre
            })
        else:
            listaMiembros.append({
                'id': miembro.id,
                'nombre': miembro.nombre,
                'telefono': miembro.telefono,
                'email': miembro.email,
                'tipoActividad': None ,
                'nombreActividad': None
            })

    return render_template('datos/lista.html', listaMiembros=listaMiembros)

@app.route('/api/data-estadisticas')
def data_estadisticas():
    try:
        data_miembros_por_dia = db.get_stats_miembros_por_dia()
        data_actividades_por_tipo = db.get_stats_actividades_por_tipo()
        data_actividades_por_comuna = db.get_stats_act_por_comuna()

        json = {
            'miembros por dia': {
                'dias': data_miembros_por_dia['dias'],
                'cantidad miembros': data_miembros_por_dia['cantidad miembros']
            },
            'actividades por tipo': {
                'tipos': data_actividades_por_tipo['tipos'],
                'cantidad de actividades': data_actividades_por_tipo['cantidad de actividades']
            },
            'actividades por comuna': {
                'comunas': data_actividades_por_comuna['comunas'],
                'cantidad de actividades': data_actividades_por_comuna['cantidad de actividades']
            }
        }

        return jsonify(json), 200
    except Exception as e:
        print(f'error en el servidor: {e}')
        return jsonify({'error': 'No se pudieron obtener los datos'}), 500

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