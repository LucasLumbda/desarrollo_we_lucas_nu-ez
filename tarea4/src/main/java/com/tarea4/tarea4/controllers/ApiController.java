package com.tarea4.tarea4.controllers;

import com.tarea4.tarea4.models.Actividad;
import com.tarea4.tarea4.models.ActividadRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ApiController {

    private final ActividadRepository actividadRepository;

    public ApiController(ActividadRepository actividadRepository) {
        this.actividadRepository = actividadRepository;
    }
}
