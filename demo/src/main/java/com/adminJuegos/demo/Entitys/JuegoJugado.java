package com.adminJuegos.demo.Entitys;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@AllArgsConstructor
@EqualsAndHashCode

public class JuegoJugado {
    
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne
    @JoinColumn(name = "idPersona")
    Persona persona;

    @ManyToOne
    @JoinColumn(name = "idJuego")
    Juego juego;

    Integer Calificacion;

    @Column(nullable = true)
    String descripcion;



    public JuegoJugado (Persona persona, Juego juego, Integer calif, String descripcion){
        this.persona = persona;
        this.juego = juego;
        this.Calificacion = calif;
        this.descripcion = descripcion;
    }

    public JuegoJugado (){

    }

    public Integer getCalificacion() {
        return this.Calificacion;
    }

    public Juego getJuego() {
        return this.juego;
    }

    public Integer getId() {
        return id;
    }
}
