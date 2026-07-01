package com.tarea4.tarea4.services;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Formatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import com.tarea4.tarea4.models.Actividad;
import com.tarea4.tarea4.models.ActividadRepository;

@Service
public class AppService {
    private final String pathStatic;
    @Autowired 
    private final ActividadRepository actividadRepository ;

    public AppService(ActividadRepository actividadRepository) throws IOException {
        this.actividadRepository = actividadRepository;
        // Dynamically resolve the absolute path for the static directory
        Path staticDir = Paths.get(ResourceUtils.getFile("classpath:static").getAbsolutePath());
        this.pathStatic = staticDir.toString();
        System.out.println("Static path resolved to: " + this.pathStatic);
    }

    //public List<Map<String, String>> getActividadesPorFrase(String frase) {
    //    List<Actividad> actividades = actividadRepository.buscarPorFrase(frase);
    //    List<Map<String, String>> confessionsData = new ArrayList<>();
    //}

    public List<Actividad> obtenerTodos() {
        return actividadRepository.findAll();
    }
}