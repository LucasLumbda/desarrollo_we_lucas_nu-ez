from sqlalchemy import create_engine, Column, Integer, BigInteger, String, ForeignKey, Time, Date
from sqlalchemy.orm import sessionmaker, declarative_base, relationship

DB_NAME = 'tarea2'
DB_USERNAME = 'cc5002'
DB_PASSWORD = 'programacionweb'
DB_HOST = 'localhost'
DB_PORT = '3306'
DB_CHARSET = "utf8"

#DB_NAME = 'tarea2'
#DB_USERNAME = 'root'
#DB_PASSWORD = 'tf2progamer'      
#DB_HOST = 'localhost'
#DB_PORT = '3306'

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=True, future=True)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

class Miembro(Base):
    __tablename__ = 'miembro'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    telefono = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    fecha_registro = Column(String(255), nullable=False)
    comuna_id = Column(BigInteger, ForeignKey('comuna.id') , nullable=False)

    comuna = relationship('Comuna', back_populates='miembros')
    actividades = relationship('Actividad', back_populates='miembro')

class Region(Base):
    __tablename__ = 'region'

    id = Column(BigInteger, primary_key=True)
    nombre = Column(String(255), nullable=False)

    comunas = relationship('Comuna', back_populates='region')

class Comuna(Base):
    __tablename__ = 'comuna'

    id = Column(BigInteger, primary_key=True)
    nombre = Column(String(255), nullable=False)
    region_id = Column(BigInteger, ForeignKey('region.id'), nullable=False)

    region = relationship('Region', back_populates='comunas')
    miembros = relationship('Miembro', back_populates='comuna')

class Actividad(Base):
    __tablename__ = 'actividad'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    miembro_id = Column(BigInteger, ForeignKey('miembro.id'))
    dia = Column(String(255), nullable=False)
    hora_inicio = Column(String(255))
    duracion = Column(BigInteger)
    tipo = Column(String(255), nullable=False)
    nombre = Column(String(255), nullable=False)
    descripcion = Column(String(255), nullable=False)

    miembro = relationship('Miembro', back_populates='actividades')
    fotos = relationship('Foto', back_populates='actividad')

class Foto(Base):
    __tablename__ = 'foto'

    foto_id = Column(BigInteger, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(255), nullable=False)
    nombre_archivo = Column(String(255), nullable=False)
    actividad_id = Column(BigInteger, ForeignKey('actividad.id'))

    actividad = relationship('Actividad', back_populates='fotos')

def getRegiones():
    session = SessionLocal()
    regiones = session.query(Region).all()
    session.close()
    return regiones

def crearMiembro(nombre, telefono, email, fecha_registro, comuna_id):
    session = SessionLocal()
    new_user = Miembro(nombre=nombre, telefono=telefono, email=email, fecha_registro=fecha_registro, comuna_id=comuna_id)
    session.add(new_user)
    session.commit()
    session.close()

def guardarActividad(miembro_id, dia, hora_inicio, duracion, tipo, nombre, descripcion):
    session = SessionLocal()
    nueva_actividad = Actividad(miembro_id=miembro_id, dia=dia, hora_inicio=hora_inicio, duracion=duracion, tipo=tipo, nombre=nombre, descripcion=descripcion)
    session.add(nueva_actividad)
    session.commit()
    session.close()

def get_id_by_nombre(nombre):
    session = SessionLocal()
    user = session.query(Miembro).filter_by(nombre=nombre).first()
    session.close()
    if user:
        return user.id
    return None

def get_actividad_by_miembro_id(miembro_id):
    session = SessionLocal()
    actividad = session.query(Actividad).filter_by(miembro_id=miembro_id).first()
    session.close()
    if actividad:
        return actividad
    return None

def getMiembros():
    session = SessionLocal()
    users = session.query(Miembro).all()
    session.close()
    return users

def get_comuna_by_actividad(actividad):
    session = SessionLocal()

    idMiembro = actividad.miembro_id
    miembro = session.query(Miembro).filter_by(id=idMiembro).first()
    idComuna = miembro.comuna_id
    comuna = session.query(Comuna).filter_by(id=idComuna).first()
    
    session.close()

    return comuna

def get_stats_miembros_por_dia():
    session = SessionLocal()
    miembros = session.query(Miembro).all()
    session.close()

    miembros_por_dia = {}
    for miembro in miembros:
        if miembro.fecha_registro in miembros_por_dia:
            miembros_por_dia[miembro.fecha_registro] = miembros_por_dia[miembro.fecha_registro] + 1
        else:
            miembros_por_dia[miembro.fecha_registro] = 1
    dias = list(miembros_por_dia.keys())
    cantidad_miembros = list(miembros_por_dia.values())

    return {'dias': dias, 'cantidad miembros': cantidad_miembros}

def get_stats_actividades_por_tipo():
    session = SessionLocal()
    actividades = session.query(Actividad).all()
    session.close()

    actividades_por_tipo = {'arte': 0, 'deporte': 0, 'tecnología': 0, 'recreación': 0, 'otra': 0}
    for act in actividades:
        if act.tipo in actividades_por_tipo:
            actividades_por_tipo[act.tipo] += 1
    tipos = list(actividades_por_tipo.keys())
    cantidad_tipos = list(actividades_por_tipo.values())

    return {'tipos': tipos, 'cantidad de actividades': cantidad_tipos}

def get_stats_act_por_comuna():
    session = SessionLocal()
    actividades = session.query(Actividad).all()
    session.close()

    acts_por_comuna = {}
    for act in actividades:
        comuna = get_comuna_by_actividad(act).nombre
        if comuna in acts_por_comuna:
            acts_por_comuna[comuna] += 1
        else:
            acts_por_comuna[comuna] = 1
    comunas = list(acts_por_comuna.keys())
    cantidad_acts = list(acts_por_comuna.values())

    return {'comunas': comunas, 'cantidad de actividades': cantidad_acts}