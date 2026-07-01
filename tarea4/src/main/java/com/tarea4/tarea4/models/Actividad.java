package com.tarea4.tarea4.models;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table
public class Actividad {

    @Id
    @SequenceGenerator(
        name = "actividad_sequence",
        sequenceName = "actividad_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "actividad_sequence"
    )
    private Long id;

    @NotNull
    private int miembro_id;

    @NotNull
    private String dia;

    @NotNull
    private String hora_inicio;
    
    @NotNull
    private String duracion;

    @NotNull
    private String tipo;

    @NotNull
    private String nombre;

    @NotNull
    private String descripcion;

    public Actividad() {
    }

    public Actividad(int miembro_id, 
                    String dia,
                    String hora_inicio,
                    String duracion,
                    String tipo,
                    String nombre) {

        this.miembro_id = miembro_id;
        this.dia = dia;
        this.hora_inicio = hora_inicio;
        this.duracion = duracion;
        this.tipo = tipo;
        this.nombre = nombre;
    }

    public Long getId() {
        return id;
    }

    public int getMiembroId() {
        return miembro_id;
    }

    public String getDia() {
        return dia;
    }

    public String getHoraInicio() {
        return hora_inicio;
    }

    public String getDuracion() {
        return duracion;
    }

    public String getTipo() {
        return tipo;
    }

    public String getNombre() {
        return nombre;
    }

//    public String getComuna() {
//        return comuna
//    }
//
//    public String getMiembro() {
//        return miembro
//    }
}