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
public class Comuna {

    @Id
    @SequenceGenerator(
        name = "comuna_sequence",
        sequenceName = "comuna_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "comuna_sequence"
    )
    private Long id;

    @NotNull
    private String nombre;

    @NotNull
    private int region_id;

    public Comuna() {
    }

    public Comuna(String nombre, 
                    int region_id) {

        this.nombre = nombre;
        this.region_id = region_id;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public int getRegionId() {
        return region_id;
    }    
}