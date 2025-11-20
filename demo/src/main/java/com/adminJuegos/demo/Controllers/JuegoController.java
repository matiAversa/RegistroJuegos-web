package com.adminJuegos.demo.Controllers;

import java.util.ArrayList;
import java.util.List;

import com.adminJuegos.demo.Entitys.DataJuegoSinJugar;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import com.adminJuegos.demo.Entitys.Juego;
import com.adminJuegos.demo.Services.JuegoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JuegoController {
    
    JuegoService servicioJuego;

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Autowired
    public JuegoController(JuegoService servicioJuego) {
        this.servicioJuego = servicioJuego;
    }


    public Juego getJuegoPorNombre (String nombre){
        return servicioJuego.findByNombre(nombre);
    }

    public Juego getPorId (Integer id){
        return servicioJuego.findById(id);
    }


}