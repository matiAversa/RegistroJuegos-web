package com.adminJuegos.demo.Validadores;

import com.adminJuegos.demo.Controllers.JuegoController;

public class ValidadorJuego {
    public static String validar (String juego){
        if (juego.isEmpty()){
            return "Se debe ingresar un Juego valido.";
        }

        if (new JuegoController().getJuegoPorNombre(juego) != null){
            return "El juego ingresado ya existe en el sistema.";
        }

        return "ok";
    }
}
