from sqlalchemy import create_engine, Column, Integer, BigInteger, String, ForeignKey, Time
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

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

class Miembro(Base):
    __tablename__ = 'miembros'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nombre_apellido = Column(String(255), nullable=False)
    celular = Column(String(255), nullable=False)
    mail = Column(String(255), nullable=False)
    fecha_registro = Column(String(255), nullable=False)
    comuna_id = Column(BigInteger, ForeignKey('comunas.comuna_id') , nullable=False)

    comuna = relationship('Comuna', back_populates='miembros')
    actividades = relationship('Actividad', back_populates='miembros')

class Region(Base):
    __tablename__ = 'region'

    id = Column(BigInteger, primary_key=True)
    nombre = Column(String(255), nullable=False)

    comunas = relationship('Comuna', back_populates='region')

class Comuna(Base):
    __tablename__ = 'comunas'

    comuna_id = Column(BigInteger, primary_key=True)
    nombre = Column(String(255), nullable=False)
    region_id = Column(BigInteger, ForeignKey('region.id'), nullable=False)

    region = relationship('Region', back_populates='comunas')
    miembros = relationship('Miembro', back_populates='comuna')

class Actividad(Base):
    __tablename__ = 'actividad'

    actividad_id = Column(BigInteger, primary_key=True, autoincrement=True)
    miembro_id = Column(BigInteger, ForeignKey('miembros.id'))
    dia = Column(String(255), nullable=False)
    hora_inicio = Column(Time)
    duracion = Column(BigInteger)
    tipo = Column(String(255), nullable=False)
    nombre = Column(String(255), nullable=False)
    descripcion = Column(String(255), nullable=False)

    miembros = relationship('Miembro', back_populates='actividades')
    foto = relationship('Foto', back_populates='actividades')

class Foto(Base):
    __tablename__ = 'foto'

    foto_id = Column(BigInteger, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(255), nullable=False)
    nombre_archivo = Column(String(255), nullable=False)
    actividad_id = Column(BigInteger, ForeignKey('actividad.actividad_id'))

    actividades = relationship('Actividad', back_populates='')

def getRegiones():
    session = SessionLocal()
    regiones = session.query(Region).all()
    session.close()
    return regiones

def crearMiembro(nombre_apellido, celular, mail, fecha_registro, comuna_id):
    session = SessionLocal()
    new_user = Miembro(nombre_apellido=nombre_apellido, celular=celular, mail=mail, fecha_registro=fecha_registro, comuna_id=comuna_id)
    session.add(new_user)
    session.commit()
    session.close()

def guardarActividad(miembro_id, dia, hora_inicio, duracion, tipo, nombre, descripcion):
    session = SessionLocal()
    nueva_actividad = Actividad(miembro_id=miembro_id, dia=dia, hora_inicio=hora_inicio, duracion=duracion, tipo=tipo, nombre=nombre, descripcion=descripcion)
    session.add(nueva_actividad)
    session.commit()
    session.close()

def get_id_by_nombre(nombre_apellido):
    session = SessionLocal()
    user = session.query(Miembro).filter_by(nombre_apellido=nombre_apellido).first()
    session.close()
    if user:
        return user.id
    return None