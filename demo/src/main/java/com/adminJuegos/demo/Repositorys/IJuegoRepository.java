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

    Juego findByNombre(String nombre);


    
}
