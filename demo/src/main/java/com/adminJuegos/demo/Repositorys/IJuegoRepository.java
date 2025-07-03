package com.adminJuegos.demo.Repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.adminJuegos.demo.Entitys.Juego;
import com.adminJuegos.demo.Entitys.Persona;

@Repository
public interface IJuegoRepository extends JpaRepository<Juego, Integer>{

    @Query("SELECT j FROM Juego j WHERE j NOT IN (SELECT jj.juego FROM JuegoJugado jj WHERE jj.persona = :persona)")
    List<Juego> findJuegosNoJugadosPorPersona(@Param("persona") Persona persona);

    Juego findByNombre(String nombre);
    
}
