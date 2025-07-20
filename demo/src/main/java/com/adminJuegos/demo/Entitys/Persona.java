package com.adminJuegos.demo.Entitys;


import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(unique=true)
    String mail;

    String password;

    @OneToMany(mappedBy = "persona", cascade = CascadeType.ALL)
    List<JuegoJugado> listaJJ = new ArrayList<>();

    public Persona() {}

    public Persona(String mail, String password) {
        this.mail = mail;
        this.password = password;
    }

    public String getPassword (){
        return this.password;
    }
    public Integer getId (){
        return this.id;
    }
}
