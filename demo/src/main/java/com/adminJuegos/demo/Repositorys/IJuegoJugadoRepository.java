package com.adminJuegos.demo.Repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.adminJuegos.demo.Entitys.*;

@Repository
public interface IJuegoJugadoRepository extends JpaRepository<JuegoJugado, Integer>{

    public List<JuegoJugado> findByPersona (Persona persona);

    public void deleteById(Integer id);

    public JuegoJugado findByPersonaIdAndJuegoId(Integer idPersona, Integer idJuego);

    public List<JuegoJugado> findByJuego (Juego juego);

}
