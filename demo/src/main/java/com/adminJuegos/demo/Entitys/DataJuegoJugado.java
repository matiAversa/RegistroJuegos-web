package com.adminJuegos.demo.Entitys;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DataJuegoJugado {

    int id;
    String nombre;
    Integer Calificacion;


    public DataJuegoJugado(Integer calificacion, String nombre) {
        this.Calificacion=calificacion;
        this.nombre=nombre;
    }

    public DataJuegoJugado(int id, Integer calificacion, String nombre) {
        this.Calificacion=calificacion;
        this.nombre=nombre;
        this.id=id;
    }
}
