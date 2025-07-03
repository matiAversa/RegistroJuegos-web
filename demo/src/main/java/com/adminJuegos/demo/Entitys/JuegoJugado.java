package com.adminJuegos.demo.Entitys;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    BigDecimal Calificacion;



    public JuegoJugado (Persona persona, Juego juego, BigDecimal calif){
        this.persona = persona;
        this.juego = juego;
        this.Calificacion = calif;
    }
}
