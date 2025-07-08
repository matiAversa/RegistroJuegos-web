package com.adminJuegos.demo.Controllers;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Controller;

import com.adminJuegos.demo.Entitys.*;
import com.adminJuegos.demo.Controllers.JuegoController;
import com.adminJuegos.demo.Services.JuegoJugadoService;

@Controller
public class JuegosJugadosController {
    
    JuegoJugadoService servicioJJ ;
    PersonaController controllerPersona;

    public List<DataJuegoJugado> getJuegosJugados (Integer id){

        return servicioJJ.getJuegosJugados(controllerPersona.findById(id));

    }


    public void addJuegoJugado (Integer id, Juego juego, BigDecimal calif){

        this.servicioJJ.saveJuegoJugado(controllerPersona.findById(id), juego, calif);

    }
}
