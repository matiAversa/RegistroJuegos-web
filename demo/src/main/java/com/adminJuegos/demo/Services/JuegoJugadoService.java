package com.adminJuegos.demo.Services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.*;

import com.adminJuegos.demo.Repositorys.IJuegoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adminJuegos.demo.Entitys.*;
import com.adminJuegos.demo.Repositorys.IJuegoJugadoRepository;

@Service
public class JuegoJugadoService {
    

    IJuegoJugadoRepository repoJuegoJugado;
    PersonaService personaService;
    IJuegoRepository juegoRepository;

    @Autowired
    public JuegoJugadoService(IJuegoJugadoRepository repoJuegoJugado,  PersonaService personaService,  IJuegoRepository juegoRepository) {
        this.repoJuegoJugado = repoJuegoJugado;
        this.personaService = personaService;
        this.juegoRepository = juegoRepository;
    }


    public List<DataJuegoSinJugar> getJuegosNoJugadosPorPersona (Integer id){
        Persona pers = personaService.findById(id);
        //List<Juego> listaSinProm = repoJuegoJugado.findJuegosNoJugadosPorPersona(pers);

        List<JuegoJugado> jugados = repoJuegoJugado.findByPersona(pers);
        List<Juego> todos = juegoRepository.findAll();

        Set<Juego> jugadosSet = jugados.stream()
                .map(JuegoJugado::getJuego)
                .collect(Collectors.toSet());

        List<Juego> listaSinProm = todos.stream()
                .filter(juego -> !jugadosSet.contains(juego))
                .collect(Collectors.toList());

        List<DataJuegoSinJugar> juegosConPromedio= new ArrayList<>() ;
        listaSinProm.forEach(j -> {
            juegosConPromedio.add(new DataJuegoSinJugar(j.getId(), j.getNombre(), this.sacarPromedio(j)));
        });

        return juegosConPromedio;
    }

    private Integer sacarPromedio(Juego juego){
        List<JuegoJugado> lista = this.repoJuegoJugado.findByJuego(juego);
        Integer cantidad = lista.size();
        Integer puntajes = lista.stream()
                .mapToInt(j -> j.getCalificacion().intValue())
                .sum();
        return puntajes / cantidad;
    }

    public List<DataJuegoJugado> getJuegosJugados (Persona persona){
        return this.repoJuegoJugado.findByPersona(persona).stream()
                .map(jj -> new DataJuegoJugado (jj.getJuego().getId(),jj.getCalificacion(), jj.getJuego().getNombre()))
                .collect(Collectors.toList());
    }

    public void saveJuegoJugado (Persona persona, Juego juego, Integer calif, String descripcion){

        this.repoJuegoJugado.save(new JuegoJugado(persona, juego, calif, descripcion));

    }

    public boolean DeleteJuegoJugado (Integer idPersona, Integer idJuego){
        try{
            JuegoJugado jj= repoJuegoJugado.findByPersonaIdAndJuegoId(idPersona,idJuego);
            if (jj != null){
                this.repoJuegoJugado.deleteById(jj.getId());
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
