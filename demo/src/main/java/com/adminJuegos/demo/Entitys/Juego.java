package com.adminJuegos.demo.Entitys;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@AllArgsConstructor
@EqualsAndHashCode


public class Juego {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    Integer id;

    String nombre;

    @OneToMany(mappedBy = "juego", cascade = CascadeType.ALL)
    List<JuegoJugado> listaJJ = new ArrayList<> ();

}