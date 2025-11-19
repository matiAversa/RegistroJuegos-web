package com.adminJuegos.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adminJuegos.demo.Entitys.Persona;
import com.adminJuegos.demo.Services.PersonaService;


@RestController
@RequestMapping("/api")
public class PersonaController {

    private final PersonaService servicioPersona;

    @Autowired
    public PersonaController(PersonaService servicioPersona) {
        this.servicioPersona = servicioPersona;
    }

    public Persona findById(Integer id) {
        return servicioPersona.findById(id);
    }

    public Persona findByMail(String mail) {
        return servicioPersona.getPersonaPorMail(mail);
    }

}
