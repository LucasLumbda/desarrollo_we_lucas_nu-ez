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
public class Miembro {

    @Id
    @SequenceGenerator(
        name = "miembro_sequence",
        sequenceName = "miembro_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "miembro_sequence"
    )
    private Long id;

    @NotNull
    private String nombre;

    @NotNull
    private String telefono;

    @NotNull
    private String email;
    
    @NotNull
    private String fecha_registro;

    @NotNull
    private int comuna_id;

    public Miembro() {
    }

    public Miembro(String nombre, 
                    String telefono,
                    String email,
                    String fecha_registro,
                    int comuna_id) {

        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.fecha_registro = fecha_registro;
        this.comuna_id = comuna_id;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public String getEmail() {
        return email;
    }

    public String getFechaRegistro() {
        return fecha_registro;
    }

    public int getComunaId() {
        return comuna_id;
    }
}