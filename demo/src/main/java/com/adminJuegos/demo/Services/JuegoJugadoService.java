package com.adminJuegos.demo.Services;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adminJuegos.demo.Entitys.*;
import com.adminJuegos.demo.Repositorys.IJuegoJugadoRepository;

@Service
public class JuegoJugadoService {
    
    @Autowired
    IJuegoJugadoRepository repoJuegoJugado;

    public List<DataJuegoJugado> getJuegosJugados (Persona persona){
        return this.repoJuegoJugado.findByPersona(persona).stream().map(jj -> new DataJuegoJugado (jj.getCalificacion(), jj.getJuego().getNombre())).collect(Collectors.toList());
    }

    public void saveJuegoJugado (Persona persona, Juego juego, BigDecimal calif){

        this.repoJuegoJugado.save(new JuegoJugado(persona, juego, calif));

    }

}
