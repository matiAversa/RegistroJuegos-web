package com.adminJuegos.demo.Entitys;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class DataJuegoSinJugar {

    int id;
    String nombre;
    int promedio;


    public DataJuegoSinJugar(String nombre, int promedio) {
        this.nombre = nombre;
        this.promedio = promedio;
    }

}
