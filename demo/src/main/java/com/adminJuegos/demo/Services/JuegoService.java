package com.adminJuegos.demo.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.adminJuegos.demo.Entitys.*;
import com.adminJuegos.demo.Repositorys.IJuegoRepository;

@Service
public class JuegoService {
    
    IJuegoRepository repoJuego;

    public List<Juego> getJuegosNoJugadosPorPersona (Integer id){
        return repoJuego.findJuegosNoJugadosPorPersona(new PersonaService().findById(id));
    }
    public Juego findByNombre(String nombre){
        return repoJuego.findByNombre(nombre);
    }


}
