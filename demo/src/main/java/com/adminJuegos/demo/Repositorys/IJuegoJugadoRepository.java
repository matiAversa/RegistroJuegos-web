package com.adminJuegos.demo.Repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adminJuegos.demo.Entitys.*;

@Repository
public interface IJuegoJugadoRepository extends JpaRepository<JuegoJugado, Integer>{
    public List<JuegoJugado> findByPersona (Persona persona);


}
