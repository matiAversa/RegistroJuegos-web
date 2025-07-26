package com.adminJuegos.demo.Entitys;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DataJuegoJugado {

    int id;
    String nombre;
    BigDecimal Calificacion;


    public DataJuegoJugado(BigDecimal calificacion, String nombre) {
        this.Calificacion=calificacion;
        this.nombre=nombre;
    }

    public DataJuegoJugado(int id, BigDecimal calificacion, String nombre) {
        this.Calificacion=calificacion;
        this.nombre=nombre;
        this.id=id;
    }
}
