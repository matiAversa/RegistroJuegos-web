package com.adminJuegos.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    public JuegoController(JuegoService servicioJuego) {
        this.servicioJuego = servicioJuego;
    }

    @GetMapping("/JuegosSinCalificar")
    public List <Juego> getJuegosSinJugar (@RequestHeader("Authorization") String token){
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }



        return servicioJuego.getJuegosNoJugadosPorPersona(id);
    }

    public Juego getJuegoPorNombre (String nombre){
        return servicioJuego.findByNombre(nombre);
    }

    public Juego getPorId (Integer id){
        return servicioJuego.findById(id);
    }


}