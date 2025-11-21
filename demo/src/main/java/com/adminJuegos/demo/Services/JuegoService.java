package com.adminJuegos.demo.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adminJuegos.demo.Entitys.*;
import com.adminJuegos.demo.Repositorys.IJuegoRepository;

@Service
public class JuegoService {

    IJuegoRepository repoJuego;

    @Autowired
    public JuegoService(IJuegoRepository repoJuego) {
        this.repoJuego = repoJuego;
    }

    public Juego findByNombre(String nombre){
        return repoJuego.findByNombre(nombre);
    }

    public Juego findById (Integer id){
        return repoJuego.findById(id).orElse(null);

    }

    public boolean estaRecomendado (String recomendado){
        boolean esta = false;

        Juego j = repoJuego.findByNombre(recomendado);
        if (j != null){esta = true;}
        return esta;
    }

}
