package com.adminJuegos.demo.Repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.adminJuegos.demo.Entitys.Persona;

@Repository
public interface IPersonaRepository extends JpaRepository<Persona,Integer>{
    public Persona findByMail(String mail);
}