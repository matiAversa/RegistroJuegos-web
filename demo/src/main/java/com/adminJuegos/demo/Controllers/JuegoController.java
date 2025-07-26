package com.adminJuegos.demo.Controllers;

import java.util.List;

import org.springframework.stereotype.Service;
import com.adminJuegos.demo.Entitys.Juego;
import com.adminJuegos.demo.Services.JuegoService;

@Service
public class JuegoController {
    
    JuegoService servicioJuego;


    public List <Juego> getJuegosSinJugar (Integer id){
        return servicioJuego.getJuegosNoJugadosPorPersona(id);
    }

    public Juego getJuegoPorNombre (String nombre){
        return servicioJuego.findByNombre(nombre);
    }

    public Juego getPorId (Integer id){
        return servicioJuego.findById(id);
    }


}
